const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Store files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Save with a unique filename (timestamp)
    }
});
const upload = multer({ storage: storage });

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'realtor listings',  // Specify your database name
});

// Add a listing (with image)
app.post('/add-listing', upload.single('image'), (req, res) => {
    const { title, description, price, location } = req.body;
    
    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Image URL path (public accessible)
    const imageUrl = `/uploads/${req.file.filename}`;

    const query = "INSERT INTO houses (title, description, price, location, image_url) VALUES (?)";
    const values = [title, description, price, location, imageUrl];

    db.query(query, [values], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.json({ message: "Listing added successfully" });
    });
});

app.get('/listings', (req, res) => {
    const query = 'SELECT * FROM houses';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch listings' });
        res.json(results);  // Return the results as JSON
    });
});


// Serve static files (for images)
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
