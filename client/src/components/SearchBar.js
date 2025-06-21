import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search location..."
                className="border p-2 rounded"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 ml-2 rounded"
                onClick={() => onSearch(query)}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar; 