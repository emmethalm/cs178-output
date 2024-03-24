"use client";

import React, { useState, useEffect } from 'react';
import SearchBar from './search/search';
import SearchDisplay from './results/results';
import ShuttleInfo from './route options/route'; 
import Ticket from './results/ticket';
import { ShuttleOptions } from './route options/route';

const SearchManager = () => {
  const [destination, setDestination] = useState('');
  const [stopName, setStopName] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [selectedShuttleOption, setSelectedShuttleOption] = useState<ShuttleOptions | null>(null);


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
    console.log('handleSubmit called');
    if (destination.trim() !== '' && stopName.trim() !== '') {
      setSearchSubmitted(true); // This will trigger the useEffect below
    }
  };

  const handleShuttleSelect = (option: ShuttleOptions) => {
    setSelectedShuttleOption(option);
    setShowTicket(true); // Show the ticket when a shuttle option is selected
  };

  useEffect(() => {
    // By putting searchSubmitted at the end of the dependency array, we ensure that this useEffect
    // runs after the stopName and destination states have been updated.
    if (searchSubmitted) {
      setShowTicket(true);
    }
  }, [destination, stopName, searchSubmitted]);

  console.log('Before Ticket:', stopName, destination);

  return (
    <div>
      {!searchSubmitted ? (
        <SearchBar onSearchChange={handleSearchChange} onSubmit={handleSubmit} />
      ) : (
        <div>
        <SearchDisplay toDestination={destination} />
        <ShuttleInfo stopName={stopName} onShuttleSelect={handleShuttleSelect} />
        {showTicket && selectedShuttleOption && (
          <Ticket
            show={showTicket}
            onClose={() => {
              setShowTicket(false);
              setSearchSubmitted(false);
              setSelectedShuttleOption(null); // Reset the selected shuttle option
            }}
            content={selectedShuttleOption}
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
