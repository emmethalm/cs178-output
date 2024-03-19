"use client";
import React, { useState } from 'react';

interface SearchDisplayProps {
  toDestination: string;
}

const SearchDisplay: React.FC<SearchDisplayProps> = ({ toDestination }) => {
  // States to manage the input values
  const [fromValue, setFromValue] = useState('SEC');
  const [toValue, setToValue] = useState(toDestination);

  // Handle changes to the "From" input
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };

  // Handle changes to the "To" input
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label htmlFor="from-destination" className="block font-semibold text-black">From:</label>
        <input
          type="text"
          id="from-destination"
          name="from-destination"
          value={fromValue}
          onChange={handleFromChange}
          className="p-2 border border-gray-300 rounded-md text-black w-full"
        />
      </div>
      <div>
        <label htmlFor="to-destination" className="block font-semibold text-black">To:</label>
        <input
          type="text"
          id="to-destination"
          name="to-destination"
          value={toValue}
          onChange={handleToChange}
          className="p-2 border border-gray-300 rounded-md text-black w-full"
        />
      </div>
    </div>
  );
};

export default SearchDisplay;