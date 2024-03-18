'use client'

import React, { useState } from 'react';
import { ModalBody } from '../results/modalBody';
import { Modal, Button, useDisclosure } from "@nextui-org/react";

const ShuttleOptions = () => {
  // Populate with real data
  const shuttleOptions = [
    { name: 'Quad SEC', eta: '5 mins', details: 'Potential traffic on Mass Ave' },
    { name: 'Quad Yard Express', eta: '8 mins'},
    { name: '1161 Bus', eta: '12 mins' },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <div style={{display: isOpen ? 'block' : 'none'}}>
          <ModalBody />
          <button onClick={onClose}>Close</button>
        </div>
    </div>
  );
};

export default ShuttleOptions;