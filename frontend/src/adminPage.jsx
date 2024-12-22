import React, { useState } from 'react';

const AddListingPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleAddListing = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('image', imageFile);  // image file selected

        try {
            const response = await fetch('http://localhost:3001/add-listing', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);  // Show success message
                // Optionally reset form
                setTitle('');
                setDescription('');
                setPrice('');
                setLocation('');
                setImageFile(null);
            } else {
                alert(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error adding listing:', error);
        }
    };

    return (
        <div>
            <h1>Add New Listing</h1>
            <form onSubmit={handleAddListing}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                />
                <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
                <button type="submit">Add Listing</button>
            </form>
        </div>
    );
};

export default AddListingPage;
