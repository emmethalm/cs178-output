// Adjust the import statements to include ShuttleOptions
'use client'

import React, { useState } from 'react';
import SearchBar from './search/search';
import SearchDisplay from './results/results';
import ShuttleOptions from './route options/route'; // Import the ShuttleOptions component

const SearchManager = () => {
  const [destination, setDestination] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleSearchChange = (value: string) => {
    setDestination(value);
  };

  const handleSubmit = () => {
    if (destination.trim() !== '') {
      setSearchSubmitted(true);
    }
  };

  return (
    <div>
      {!searchSubmitted ? (
        <SearchBar onSearchChange={handleSearchChange} onSubmit={handleSubmit} />
      ) : (
        <div>
          <SearchDisplay toDestination={destination} />
          <ShuttleOptions /> {/* Render ShuttleOptions here */}
        </div>
      )}
    </div>
  );
};

export default SearchManager;
