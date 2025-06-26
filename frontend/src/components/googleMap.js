import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({ locations }) => {
    const [map, setMap] = useState(null);

    const MAP_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your Google Maps API Key

    const containerStyle = {
        width: "100%",
        height: "500px",
    };

    const center = {
        lat: 7.8731, // Default Sri Lanka coordinates
        lng: 80.7718,
    };

    const onLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <LoadScript googleMapsApiKey={MAP_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={7}
                    onLoad={onLoad}
                >
                    {locations.map((location) => (
                        <Marker
                            key={location._id}
                            position={{
                                lat: parseFloat(location.latitude),
                                lng: parseFloat(location.longitude),
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapComponent; 