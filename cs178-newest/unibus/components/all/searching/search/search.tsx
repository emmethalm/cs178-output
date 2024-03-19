"use client";

import React, { useState } from 'react';

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Title above the search bar */}
      <h2 className="text-lg font-bold text-black mb-2">Where To?</h2>
      <div className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="mr-2 p-2 border border-gray-300 rounded-md text-black"
          placeholder="Destination"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
