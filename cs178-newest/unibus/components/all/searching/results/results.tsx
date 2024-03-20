"use client";
import React, { useState } from 'react';
import { stops } from './../../../../data';

interface SearchDisplayProps {
  toDestination: string;
}

const SearchDisplay: React.FC<SearchDisplayProps> = ({ toDestination }) => {
  const [fromValue, setFromValue] = useState('SEC');
  const [toValue, setToValue] = useState(toDestination);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [filteredFromStops, setFilteredFromStops] = useState<{ label: string; value: string }[]>([]);
  const [filteredToStops, setFilteredToStops] = useState<{ label: string; value: string }[]>([]);

  const filterStops = (value: string) => stops.filter(stop => 
    stop.label.toLowerCase().startsWith(value.toLowerCase())
  );

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    if (showFromSuggestions) {
      const matchedStops = filterStops(value);
      setFilteredFromStops(matchedStops);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToValue(value);
    if (showToSuggestions) {
      const matchedStops = filterStops(value);
      setFilteredToStops(matchedStops);
    }
  };

  const selectFromStop = (label: string) => {
    setFromValue(label);
    setShowFromSuggestions(false);
  };

  const selectToStop = (label: string) => {
    setToValue(label);
    setShowToSuggestions(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4 relative">
        <label htmlFor="from-destination" className="block font-semibold text-black">From:</label>
        <input
          type="text"
          id="from-destination"
          name="from-destination"
          value={fromValue}
          onChange={handleFromChange}
          onFocus={() => {
            setShowFromSuggestions(true);
            setFilteredFromStops(filterStops(''));
          }}
          className="p-2 border border-gray-300 rounded-md text-black w-full"
        />
        {showFromSuggestions && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto w-full">
            {filteredFromStops.map((stop, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectFromStop(stop.label)}>
                {stop.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <label htmlFor="to-destination" className="block font-semibold text-black">To:</label>
        <input
          type="text"
          id="to-destination"
          name="to-destination"
          value={toValue}
          onChange={handleToChange}
          onFocus={() => {
            setShowToSuggestions(true);
            setFilteredToStops(filterStops(''));
          }}
          className="p-2 border border-gray-300 rounded-md text-black w-full"
        />
        {showToSuggestions && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto w-full">
            {filteredToStops.map((stop, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectToStop(stop.label)}>
                {stop.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDisplay;