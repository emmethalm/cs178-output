// SearchManager.tsx
'use client'

import React, { useState } from 'react';
import SearchBar from './search/search'; // Adjust import paths as necessary
import SearchDisplay from './results/results'; // Adjust import paths as necessary

const SearchManager = () => {
  const [destination, setDestination] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // Explicitly type the parameter as a string
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
        <SearchDisplay toDestination={destination} />
      )}
    </div>
  );
};

export default SearchManager;
