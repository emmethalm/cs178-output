'use client'

import React from 'react';

const ShuttleOptions = () => {
  // Fetch real data here when needed
  const shuttleOptions = [
    { name: 'Quad SEC', eta: '5 mins', details: 'Potential traffic on Mass Ave' },
    { name: 'Quad Yard Express', eta: '8 mins'},
    { name: '1161 Bus', eta: '12 mins' },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-black">Shuttle Options</h3>
      <div className="flex flex-col text-black">
        {shuttleOptions.map((option, index) => (
          <div key={index} className="mb-2 p-2 border border-gray-300 rounded-lg">
            <p><strong>Name:</strong> {option.name}</p>
            <p><strong>ETA:</strong> {option.eta}</p>
            {option.details && <p><strong>Details:</strong> {option.details}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShuttleOptions;
