"use client";

import React, { useState } from 'react';
import SearchBar from './search/search';
import SearchDisplay from './results/results';
import ShuttleInfo from './route options/route'; 

const SearchManager = () => {
  const [destination, setDestination] = useState('');
  const [stopName, setStopName] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleSearchChange = (value: string) => {
    setStopName(value);
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
          {/* TODO: stopName value here */}
          <ShuttleInfo stopName={stopName} /> {/* Render ShuttleOptions here */}
        </div>
      )}
    </div>
  );
};

export default SearchManager;
