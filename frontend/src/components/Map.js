import React, { useState } from "react";
import { Map, Marker } from "@vis.gl/react-mapbox";
import "mapbox-gl/dist/mapbox-gl.css"; // Required for styling

const MAPBOX_TOKEN = "pk.eyJ1IjoibWVyYW5nYSIsImEiOiJjbThibmo5cHkxMGZtMmxvbG00bmtpZjlzIn0.kIiKhATa83O7D5A35UMDOw"; // Replace with your Mapbox API key

const MapComponent = ({ locations }) => {
    const [viewport, setViewport] = useState({
        latitude: 7.8731, // Default Sri Lanka coordinates
        longitude: 80.7718,
        zoom: 7,
    });

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                {locations.map((location) => {
                    const lat = parseFloat(location.latitude);
                    const lng = parseFloat(location.longitude);

                   
                    if (isNaN(lat) || isNaN(lng)) {
                        console.warn(`Invalid coordinates for location: ${location._id}`);
                        return null; // Skip this location if coordinates are invalid
                    }

                    return (
                        <Marker
                            key={location._id}
                            latitude={lat}
                            longitude={lng}
                        >
                            📍
                        </Marker>
                    );
                })}
            </Map>
        </div>
    );
};

export default MapComponent; 