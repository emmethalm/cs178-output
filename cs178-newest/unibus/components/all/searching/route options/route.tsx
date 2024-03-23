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
        // Gets stop ID from name
        const stopResponse = await fetch(`/api/getShuttleOptions?stop_name=${stopName}`);
        if (!stopResponse.ok) {
          throw new Error(`HTTP error! status: ${stopResponse.status}`);
        }
        const stopData = await stopResponse.json();
        if (!stopData || !stopData.stopId) {
          throw new Error("stopId not found in response");
        }
        const { stopId } = stopData;

        // Get all trip update data
        const tripUpdatesUrl = 'https://passio3.com/harvard/passioTransit/gtfs/realtime/tripUpdates.json';
        const tripUpdatesResponse = await fetch(tripUpdatesUrl);
        if (!tripUpdatesResponse.ok) {
          throw new Error(`HTTP error! status: ${tripUpdatesResponse.status}`);
        }
        const tripUpdatesData: ApiResponse = await tripUpdatesResponse.json();

        console.log("Trip updates data fetched:", tripUpdatesData);

        const relevantUpdates = tripUpdatesData.entity
        .map(entity => {
          const mappedEntity = {
            ...entity.trip_update,
            tripId: entity.trip_update.trip.trip_id,
          };
          console.log("Mapped entity:", mappedEntity);
          return mappedEntity;
        })
        // Inside your .filter() function
        .filter(update => {
          console.log('Looking for stopId:', stopId);
          console.log('Available stopIds in update:', update.stop_time_update.map(stu => stu.stop_id));
          const isRelevant = update.stop_time_update.some(stu => stu.stop_id === stopId);
          console.log(`Is update with tripId ${update.tripId} relevant for stopId ${stopId}:`, isRelevant);
          return isRelevant;
        })
        .map(update => {
          const arrivalTime = update.stop_time_update.find(stu => stu.stop_id === stopId)?.arrival?.time;
          const shuttleOption = {
            name: update.tripId, // Assuming you want to display the trip ID as 'name', adjust as needed
            eta: arrivalTime ? new Date(arrivalTime * 1000).toLocaleTimeString() : 'Unknown',
            details: arrivalTime ? `Arriving at ${new Date(arrivalTime * 1000).toLocaleTimeString()}` : 'Arrival time unknown'
          };
          console.log("Shuttle option:", shuttleOption);
          return shuttleOption;
        })
        .sort((a, b) => {
          // Adjusted sorting logic
          const timeA = a.eta !== 'Unknown' ? new Date(a.eta).getTime() : Number.MAX_SAFE_INTEGER;
          const timeB = b.eta !== 'Unknown' ? new Date(b.eta).getTime() : Number.MAX_SAFE_INTEGER;
          console.log(`Comparing ETA times: ${a.eta} (${timeA}) with ${b.eta} (${timeB})`);
          return timeA - timeB;
        })
        .slice(0, 3);

        console.log("Relevant updates after sorting and slicing:", relevantUpdates);

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
