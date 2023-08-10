import React, {useState } from 'react';
import { SearchIcon } from 'lucide-react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform search logic here with the search term
        console.log('Searching for:', searchTerm);
    };

    const handleSearch = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    
        try {
            const response = await fetch(`http://localhost:3000/api/search?query=${value}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSearchResults(data.results);
            } else {
            throw new Error('Search request failed');
            }
        } catch (error) {
            console.error('Error searching:', error);
            setSearchResults([]);
        }
        };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.albums.map((album) => (
                        <li key={album.id}>{album.name}</li>
                    ))}
                    {searchResults.songs.map((song) => (
                        <li key={song.id}>{song.name}</li>
                    ))}
                </ul>
            ):(
                <ul>
                    
                </ul>
            )}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-t-none rounded-b-none rounded-r-lg hover:bg-blue-700 -ml-3 h-[42px]"
            >
                <SearchIcon />
            </button>
        </form>
    );
}

export default SearchBar;