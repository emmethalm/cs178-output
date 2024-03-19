"use client";

import React from 'react';
import Title from '../components/all/title/title';
import Description from '../components/all/description/description';
import MapComponent from '../components/all/map/map';
import SearchManager from '../components/all/searching/searchmanager'; 
import RootLayout from './layout';
import {NextUIProvider as NextUi} from "@nextui-org/react";


const Page = () => {
  return (
    // <RootLayout>
    <NextUi>
    <div className="relative min-h-screen bg-gray-100 flex">
      {/* Left half container */}
      <div className="flex-1 flex flex-col p-8">
        {/* Container for title, description, and search to center them horizontally */}
        <div className="w-full flex flex-col items-center">
          <Title />
          <Description />
          <SearchManager /> {/* Use SearchManager here */}
        </div>
        {/* Other content can go here if needed */}
      </div>
      {/* Right half container for the map */}
      <div className="flex-1">
        <MapComponent />
      </div>
    </div>
    {/* // </RootLayout> */}
    </NextUi>
  );
};

export default Page;
