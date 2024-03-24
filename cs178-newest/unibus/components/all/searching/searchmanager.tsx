"use client";

import React, { useState, useEffect } from 'react';
import SearchBar from './search/search';
import SearchDisplay from './results/results';
import ShuttleInfo from './route options/route'; 
import Ticket from './results/ticket';

const SearchManager = () => {
  const [destination, setDestination] = useState('');
  const [stopName, setStopName] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  useEffect(() => {
    console.log('Updated stopName and destination:', stopName, destination);
  }, [stopName, destination]);

  const handleSearchChange = (value: string, isDestination: boolean = false) => {
    if (isDestination) {
      setDestination(value);
    } else {
      setStopName(value);
    }
  };

  const handleSubmit = () => {
    if (destination.trim() !== '' && stopName.trim() !== '') {
      setSearchSubmitted(true);
      setShowTicket(true);
    }
  };

  useEffect(() => {
    if (searchSubmitted && destination && stopName) {
      setShowTicket(true);
    }
  }, [searchSubmitted, destination, stopName]);

  console.log('Before Ticket:', stopName, destination);

  return (
    <div>
      {!searchSubmitted ? (
        <SearchBar onSearchChange={handleSearchChange} onSubmit={handleSubmit} />
      ) : (
        <div>
          <SearchDisplay toDestination={destination} />
          <ShuttleInfo stopName={stopName} />
          {showTicket && destination && stopName && (
            <Ticket
              show={showTicket}
              onClose={() => setShowTicket(false)}
              content={{ name: '', eta: '' }} // Placeholder content, should be replaced with actual data
              currentStopName={stopName}
              destinationStopName={destination}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchManager;
