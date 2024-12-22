import React, { useEffect, useState } from "react";

const ListingsPage = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/listings")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);  // Check what the data looks like in the console
                setListings(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Available Listings</h1>
            {listings.length > 0 ? (
                listings.map((listing) => (
                    <div key={listing.id}>
                        <h2>{listing.title}</h2>
                        <p>{listing.description}</p>
                        <p><strong>Price:</strong> ${listing.price}</p>
                        <p><strong>Location:</strong> {listing.location}</p>
                        <img
                            src={`http://localhost:3001${listing.image_url}`}
                            alt="House"
                            style={{ width: "300px" }}
                        />
                    </div>
                ))
            ) : (
                <p>No listings available.</p>
            )}
        </div>
    );
};

export default ListingsPage;
