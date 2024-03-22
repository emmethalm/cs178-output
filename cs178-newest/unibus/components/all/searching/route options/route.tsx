// TODO: return each part needed to display upcoming routes for a given stop

"use client";

import React, { useState, useEffect } from 'react';
import AlertButton from "../alertButton";
import Ticket from "../results/ticket";

interface ShuttleOptions {
  name: string;
  eta: string;
  details: string;
}

interface ApiResponse {
  entity: {
    id: string;
    is_deleted: boolean;
    trip_update: {
      stop_time_update: {
        stop_id: string;
        arrival: {
          time: number;
        };
      }[];
      trip: {
        trip_id: string;
        route_id: string;
      };
    };
  }[];
}

interface ShuttleProps {
  stopName: string;
}

export default function ShuttleInfo({ stopName }: ShuttleProps) {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [shuttleOptions, setShuttleOptions] = useState<ShuttleOptions[]>([]);

  useEffect(() => {
    const fetchShuttles = async () => {
      try {
        const stopResponse = await fetch(`/api/getShuttleOptions?stop_name=${stopName}`);
        if (!stopResponse.ok) {
          throw new Error(`HTTP error! status: ${stopResponse.status}`);
        }
        const stopData = await stopResponse.json();
        if (!stopData || !stopData.stopId) {
          throw new Error("stopId not found in response");
        }
        const { stopId } = stopData;

        const tripUpdatesUrl = 'https://passio3.com/harvard/passioTransit/gtfs/realtime/tripUpdates.json';
        const tripUpdatesResponse = await fetch(tripUpdatesUrl);
        if (!tripUpdatesResponse.ok) {
          throw new Error(`HTTP error! status: ${tripUpdatesResponse.status}`);
        }
        const tripUpdatesData: ApiResponse = await tripUpdatesResponse.json();

        const relevantUpdates = tripUpdatesData.entity
          .filter(entity => !entity.is_deleted)
          .map(entity => entity.trip_update)
          .filter(update => update.stop_time_update.some(stu => stu.stop_id === stopId))
          .map(update => {
            const arrivalTime = update.stop_time_update.find(stu => stu.stop_id === stopId)?.arrival?.time;
            return {
              name: update.trip.route_id,
              eta: arrivalTime ? new Date(arrivalTime * 1000).toLocaleTimeString() : 'Unknown',
              details: arrivalTime ? `Arriving at ${new Date(arrivalTime * 1000).toLocaleTimeString()}` : 'Arrival time unknown'
            };
          })
          .sort((a, b) => (a.eta === 'Unknown' ? Number.MAX_SAFE_INTEGER : new Date(a.eta).getTime()) - (b.eta === 'Unknown' ? Number.MAX_SAFE_INTEGER : new Date(b.eta).getTime()))
          .slice(0, 3);

        setShuttleOptions(relevantUpdates);
      } catch (error) {
        console.error("Failed to fetch shuttle info:", error);
      }
    };

    fetchShuttles();
  }, [stopName]);

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
