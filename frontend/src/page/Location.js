import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MapComponent from "../components/Map.js";

function Location() {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState({
        name: "",
        longitude: "",
        latitude: ""
    });

    // Validation functions
    const validateName = (name) => {
        if (!name) {
            toast.error("Location name is required");
            return false;
        }
        if (name.length < 2) {
            toast.error("Location name must be at least 2 characters long");
            return false;
        }
        return true;
    };

    const validateCoordinate = (value, type) => {
        // Remove any whitespace
        const cleanValue = value.trim();

        // Check if empty
        if (!cleanValue) {
            toast.error(`${type.charAt(0).toUpperCase() + type.slice(1)} is required`);
            return false;
        }

        // Convert to number and check if it's a valid number
        const numValue = parseFloat(cleanValue);
        if (isNaN(numValue)) {
            toast.error(`Invalid ${type} format`);
            return false;
        }

        // Specific range checks
        if (type === 'longitude' && (numValue < -180 || numValue > 180)) {
            toast.error("Longitude must be between -180 and 180");
            return false;
        }

        if (type === 'latitude' && (numValue < -90 || numValue > 90)) {
            toast.error("Latitude must be between -90 and 90");
            return false;
        }

        return true;
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/location/find-all");
            setLocations(response.data.data);
        } catch (error) {
            toast.error("Error fetching locations");
            console.error("Error fetching locations:", error);
        }
    };

    const handleAddLocation = async () => {
        // Validate all fields before submission
        const isNameValid = validateName(newLocation.name);
        const isLongitudeValid = validateCoordinate(newLocation.longitude, 'longitude');
        const isLatitudeValid = validateCoordinate(newLocation.latitude, 'latitude');

        // Only proceed if all validations pass
        if (isNameValid && isLongitudeValid && isLatitudeValid) {
            try {
                console.log('Sending location data:', newLocation);
                const response = await axios.post("http://localhost:3000/api/v1/location/create", {
                    name: newLocation.name.trim(),
                    longitude: parseFloat(newLocation.longitude),
                    latitude: parseFloat(newLocation.latitude)
                });

                console.log('Server response:', response.data);

                if (response.data && response.data.Location) {
                    // Add new location to the list
                    setLocations([...locations, response.data.Location]);

                    // Reset input fields
                    setNewLocation({ name: "", longitude: "", latitude: "" });

                    // Success toast
                    toast.success("Location added successfully!");
                } else {
                    throw new Error('Invalid response from server');
                }
            } catch (error) {
                console.error('Error details:', error.response?.data || error.message);
                toast.error(error.response?.data?.error || "Error adding location");
            }
        }
    };

    // Input change handlers with real-time validation
    const handleNameChange = (e) => {
        const value = e.target.value;
        setNewLocation({ ...newLocation, name: value });
        validateName(value);
    };

    const handleLongitudeChange = (e) => {
        const value = e.target.value;
        setNewLocation({ ...newLocation, longitude: value });
        validateCoordinate(value, 'longitude');
    };

    const handleLatitudeChange = (e) => {
        const value = e.target.value;
        setNewLocation({ ...newLocation, latitude: value });
        validateCoordinate(value, 'latitude');
    };

    return (
        <div className="text-center min-h-screen bg-green-100">
            {/* Toast Container for notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="w-full h-[100px] bg-green-700">
                <h1 className="text-2xl font-bold p-4 text-white">Tea plantation locator</h1>
            </div>

            <div className="my-4">
                <input
                    type="text"
                    placeholder="Location Name"
                    className="border p-2 m-2"
                    value={newLocation.name}
                    onChange={handleNameChange}
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    className="border p-2 m-2"
                    value={newLocation.longitude}
                    onChange={handleLongitudeChange}
                />
                <input
                    type="text"
                    placeholder="Latitude"
                    className="border p-2 m-2"
                    value={newLocation.latitude}
                    onChange={handleLatitudeChange}
                />
                <button
                    className="bg-green-500 text-white px-4 py-2 m-2"
                    onClick={handleAddLocation}
                >
                    Add Location
                </button>

                <button
                    className="bg-blue-500 text-white px-4 py-2 m-2"
                    onClick={() => navigate("/location-list")}
                >
                    Location List
                </button>
            </div>

            <MapComponent locations={locations} />
        </div>
    );
}

export default Location; 