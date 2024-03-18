// Alert button to report delays
import React, { useState } from 'react';

const AlertButton: React.FC = () => {
  const [reportClicked, setReportClicked] = useState(false);

  const handleClick = () => {
    setReportClicked(true);
  };

  return (
    <button onClick={handleClick} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
      {reportClicked ? 'Still not arrived' : 'Report delay'}
    </button>
  );
};

export default AlertButton;

    
  

