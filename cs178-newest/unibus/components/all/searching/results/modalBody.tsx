import React, { useEffect, useState } from 'react';

interface ModalBodyProps {
  currentStopName: string;
  destinationStopName: string;
}

export default function ModalBody({ currentStopName, destinationStopName }: ModalBodyProps) {
  const [stops, setStops] = useState<{ name: string; time: string }[]>([]);

  useEffect(() => {
    const fetchStopsAndTimes = async () => {
      // Assuming there's an API endpoint to get the stops between current and destination
      const response = await fetch(`/api/getStopsBetween?currentStopName=${encodeURIComponent(currentStopName)}&destinationStopName=${encodeURIComponent(destinationStopName)}`);      
      if (!response.ok) {
        throw new Error('Failed to fetch stops');
      }
      const stopsData = await response.json();
      const stopsWithTimes = await Promise.all(stopsData.map(async (stop: { name: string; trip_id: string }) => {
        const etaResponse = await fetch(`/api/getETA?trip_id=${stop.trip_id}`);
        if (!etaResponse.ok) {
          throw new Error('Failed to fetch ETA');
        }
        const etaData = await etaResponse.json();
        const currentTime = Date.now();
        const timeDifference = Math.round((etaData.eta - currentTime) / 60000);
        return {
          name: stop.name,
          time: `${timeDifference} mins`
        };
      }));
      setStops(stopsWithTimes);
    };

    fetchStopsAndTimes();
  }, [currentStopName, destinationStopName]);

  return (
    <div className="max-w-sm mx-auto">
      <div className="space-y-4 pt-2">
        {stops.map((stop, index) => (
          <div className="flex items-center" key={index}>
            <div className={`flex flex-col items-center mr-4`}>
              <div className="w-3 h-3 bg-black rounded-full relative z-10"></div>
            </div>
            <div className="flex-1 flex justify-between">
              <div className="font-bold">{stop.name}</div>
              <div className="font-bold">{stop.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
