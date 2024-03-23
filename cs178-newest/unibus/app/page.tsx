"use client";

import React from 'react';
import Title from '../components/all/title/title';
import Description from '../components/all/description/description';
import Privacy from '../components/all/description/privacynotice';
import MapComponent from '../components/all/map/map';
import SearchManager from '../components/all/searching/searchmanager'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 flex">
      {/* Left half container */}
      <div className="flex-1 flex flex-col p-8 relative">
        {/* Container for title, description, and search to center them horizontally */}
        <div className="w-full flex flex-col items-center">
          <Title />
          <Description />
          <SearchManager />
        </div>
        {/* Privacy component added to bottom left */}
        <div className="absolute bottom-0 left-0 p-4">
          <Privacy />
        </div>
      </div>
      {/* Right half container for the map */}
      <div className="flex-1">
        <MapComponent />
      </div>
    </div>
  );
};

export default Page;
