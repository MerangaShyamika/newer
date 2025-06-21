import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LocationList() {
    const [locations, setLocations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/location/find-all");
            setLocations(response.data.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const deleteLocation = async (id) => {
        if (window.confirm(`Are you sure you want to delete this location?`)) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/location/delete/${id}`);
                setLocations(locations.filter((location) => location._id !== id));
            } catch (error) {
                console.error("Error deleting location:", error);
            }
        }
    };

    const handleUpdateClick = (location) => {
        setSelectedLocation(location);
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = async () => {
        if (!selectedLocation) return;

        try {
            await axios.put(
                `http://localhost:3000/api/v1/location/update/${selectedLocation._id}`,
                selectedLocation
            );

            setLocations((prevLocations) =>
                prevLocations.map((loc) =>
                    loc._id === selectedLocation._id ? { ...loc, ...selectedLocation } : loc
                )
            );

            setIsModalOpen(false);
            alert("Location updated successfully!");
        } catch (error) {
            console.error("Error updating location:", error);
            alert("Failed to update location.");
        }
    };

    const filteredLocations = locations.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">📍 Location List</h1>

            <button
                className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg mb-4"
                onClick={() => navigate("/")}
            >
                ⬅ Back to Location Page
            </button>

            <input
                type="text"
                placeholder="🔍 Search locations..."
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ul className="mt-6 space-y-4">
                {filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                        <li
                            key={location._id}
                            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <span className="font-semibold text-lg">{location.name}</span>
                                <p className="text-gray-600">({location.latitude}, {location.longitude})</p>
                            </div>
                            <div>
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2"
                                    onClick={() => handleUpdateClick(location)}
                                >
                                    ✏ Update
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    onClick={() => deleteLocation(location._id)}
                                >
                                    ❌ Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No locations found</p>
                )}
            </ul>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">Update Location</h2>
                        <input
                            type="text"
                            placeholder="Location Name"
                            className="border p-2 m-2 w-full rounded-lg"
                            value={selectedLocation.name}
                            onChange={(e) =>
                                setSelectedLocation({ ...selectedLocation, name: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Longitude"
                            className="border p-2 m-2 w-full rounded-lg"
                            value={selectedLocation.longitude}
                            onChange={(e) =>
                                setSelectedLocation({ ...selectedLocation, longitude: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Latitude"
                            className="border p-2 m-2 w-full rounded-lg"
                            value={selectedLocation.latitude}
                            onChange={(e) =>
                                setSelectedLocation({ ...selectedLocation, latitude: e.target.value })
                            }
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                onClick={handleUpdateSubmit}
                            >
                                ✅ Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LocationList; 