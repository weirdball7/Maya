import React, { useState } from "react";
import AddListingPage from "./adminPage";
import ListingsPage from "./listingPage";

const App = () => {
    const [showAddListing, setShowAddListing] = useState(true); // State to toggle views

    return (
        <div>
            <h1>Realtor Website</h1>
            
            {/* Buttons to switch between views */}
            <button onClick={() => setShowAddListing(true)}>Add Listing</button>
            <button onClick={() => setShowAddListing(false)}>View Listings</button>

            {/* Conditional rendering based on showAddListing state */}
            {showAddListing ? <AddListingPage /> : <ListingsPage />}
        </div>
    );
};

export default App;
