"use client";

import React, { useState } from 'react';
import AlertButton from "../alertButton";
import Ticket from "../results/ticket";

// Populate with live data
const ShuttleOptions = () => {
  const shuttleOptions = [
    { name: 'Quad SEC', eta: '5 mins', details: 'Potential traffic on Mass Ave' },
    { name: 'Quad Yard Express', eta: '8 mins'},
    { name: '1161 Bus', eta: '12 mins' },
  ];

  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-black">Shuttle Options</h3>
      <div className="flex flex-col text-black">
        {shuttleOptions.map((option, index) => (
          <button
            key={index}
            className={`mb-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-200 ${selectedRoute === index ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedRoute(index)}
          >
            <p><strong>Name:</strong> {option.name}</p>
            <p><strong>ETA:</strong> {option.eta}</p>
            {option.details && <p><strong>Details:</strong> {option.details}</p>}
            <AlertButton />
          </button>
        ))}
      </div>
      {selectedRoute !== null && (
        <Ticket
          show={true}
          onClose={() => setSelectedRoute(null)}
          content={shuttleOptions[selectedRoute]}
        />
      )}
    </div>
  );
};

export default ShuttleOptions;

