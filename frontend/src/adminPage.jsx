import React, { useState, useEffect } from 'react';

const AddListingPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [listings, setListings] = useState([]);

    // Fetch active listings
    useEffect(() => {
        fetch("http://localhost:3001/listings")
            .then((res) => res.json())
            .then((data) => setListings(data))
            .catch((err) => console.error(err));
    }, []);

    const handleAddListing = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('image', imageFile);

        try {
            const response = await fetch('http://localhost:3001/add-listing', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
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

    const handleDeleteListing = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/delete-listing/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setListings(listings.filter((listing) => listing.id !== id)); // Remove deleted listing from state
            } else {
                alert(data.error || 'Failed to delete listing');
            }
        } catch (error) {
            console.error('Error deleting listing:', error);
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

            <h2>Active Listings</h2>
            <ul>
                {listings.map((listing) => (
                    <li key={listing.id}>
                        <h3>{listing.title}</h3>
                        <p>{listing.description}</p>
                        <p><strong>Price:</strong> ${listing.price}</p>
                        <p><strong>Location:</strong> {listing.location}</p>
                        <img src={`http://localhost:3001${listing.image_url}`} alt="House" style={{ width: '100px' }} />
                        <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddListingPage;
