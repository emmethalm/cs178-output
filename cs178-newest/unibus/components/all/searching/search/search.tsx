"use client";

import React, { useState } from 'react';
import { stops } from './../../../../data';

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredStops, setFilteredStops] = useState<{ label: string; value: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearchChange(value);

    const matchedStops = value.trim() ? stops.filter(stop => 
      stop.label.toLowerCase().startsWith(value.toLowerCase())
    ) : stops;
    setFilteredStops(matchedStops);
  };

  const handleFocus = () => {
    if (!inputValue.trim()) {
      setFilteredStops(stops);
    }
  };

  const handleSelect = (label: string) => {
    setInputValue(label);
    onSearchChange(label);
    setFilteredStops([]); 
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h2 className="text-lg font-bold text-black mb-2">Where To?</h2>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          className="p-2 border border-gray-300 rounded-md text-black flex-grow mr-2"
          placeholder="Destination"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Search
        </button>
      </div>
      {filteredStops.length > 0 && (
        <ul className="list-none mt-2 w-full max-h-60 overflow-auto border border-gray-300 rounded-md">
          {filteredStops.map((stop, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(stop.label)}>
              {stop.label}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;