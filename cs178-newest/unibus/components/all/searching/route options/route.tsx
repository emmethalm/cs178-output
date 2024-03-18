'use client'

import React from 'react';
import { useDisclosure } from "@nextui-org/react";
import SelectedView from '../results/selectedView';

const ShuttleOptions = () => {
  // Populate with real data
  const shuttleOptions = [
    { name: 'Quad SEC', eta: '5 mins', details: 'Potential traffic on Mass Ave' },
    { name: 'Quad Yard Express', eta: '8 mins'},
    { name: '1161 Bus', eta: '12 mins' },
  ];

  const { onOpen, onClose } = useDisclosure();

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-black">Shuttle Options</h3>
      <div className="flex flex-col text-black">
        {shuttleOptions.map((option, index) => (
          <button key={index} className="mb-2 p-2 border border-gray-300 rounded-lg" onClick={onOpen}>
            <p><strong>Name:</strong> {option.name}</p>
            <p><strong>ETA:</strong> {option.eta}</p>
            {option.details && <p><strong>Details:</strong> {option.details}</p>}
          </button>
        ))}
      </div>
      <SelectedView />
    </div>
  );
};

export default ShuttleOptions;