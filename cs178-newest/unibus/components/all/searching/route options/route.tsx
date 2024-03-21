"use client";

import React, { useState, useEffect } from 'react';
import AlertButton from "../alertButton";
import Ticket from "../results/ticket";

// Added interface types to bypass TS errors

interface ShuttleOption {
  name: string;
  eta: string;
  details: string;
}

interface StopTimeUpdate {
  stop_id: string;
  arrival: {
    time: number;
  };
  trip_id?: string;
}

interface TripUpdateEntity {
  trip_update: {
    trip: {
      trip_id: string;
    };
    stop_time_update: StopTimeUpdate[];
  };
}

interface ApiResponse {
  entity: TripUpdateEntity[];
}

interface ShuttleProps {
  stopName: string;
}
// Error: stopName undefined | make sure I'm passing this in a prop from 


export default function ShuttleInfo({ stopName }: ShuttleProps) {
  const [shuttles, setShuttles] = useState<StopTimeUpdate[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  useEffect(() => {
    const fetchShuttles = async () => {
      try {
        // Get the stop_id from your local database via the API route
        const stopResponse = await fetch(`/api/getShuttleOptions?stop_name=${stopName}`);
        const { stopId } = await stopResponse.json();

        // Now fetch the trip updates from the external API
        const tripUpdatesResponse = await fetch('https://passio3.com/harvard/passioTransit/gtfs/realtime/tripUpdates');
        const tripUpdatesData: ApiResponse = await tripUpdatesResponse.json();

        // Filter the updates by stop_id and order by arrival time, then take the top 3
        const relevantShuttles: StopTimeUpdate[] = tripUpdatesData.entity
          .flatMap((entity) =>
            entity.trip_update.stop_time_update
              .filter((update) => update.stop_id === stopId)
              .map((update) => ({
                ...update,
                trip_id: entity.trip_update.trip.trip_id, // Include trip_id for reference
              }))
          )
          .sort((a, b) => b.arrival.time - a.arrival.time) // Sort by arrival time descending
          .slice(0, 3); // Get the top 3 results

        setShuttles(relevantShuttles);
      } catch (error) {
        console.error('Failed to fetch shuttle options:', error);
      }
    };

    const intervalId = setInterval(fetchShuttles, 30000);
    fetchShuttles();

    return () => clearInterval(intervalId);
  }, [stopName]);

  // Transform shuttles data into a format for displaying
  const shuttleOptions: ShuttleOption[] = shuttles.map((shuttle) => ({
    name: `Trip ID: ${shuttle.trip_id}`, // Replace with real name if available
    eta: `${Math.round((shuttle.arrival.time - Math.floor(Date.now() / 1000)) / 60)} mins`,
    details: `Arriving at: ${new Date(shuttle.arrival.time * 1000).toLocaleTimeString()}`, // Add any other details if available
  }));

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
            <p><strong>Details:</strong> {option.details}</p>
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
}
