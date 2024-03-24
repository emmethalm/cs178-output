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

interface ShuttleProps {
  stopName: string;
  onShuttleSelect?: (option: ShuttleOptions) => void;
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

export default function ShuttleInfo({ stopName }: ShuttleProps) {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [shuttleOptions, setShuttleOptions] = useState<ShuttleOptions[]>([]);

  useEffect(() => {
    const fetchShuttles = async () => {
      try {
        console.log(`Fetching shuttle options for stop: ${stopName}`);
        // Gets stop ID from name
        const stopResponse = await fetch(`/api/getShuttleOptions?stop_name=${stopName}`);
        console.log('Received stopResponse', stopResponse);
        if (!stopResponse.ok) {
          throw new Error(`HTTP error! status: ${stopResponse.status}`);
        }
        const stopData = await stopResponse.json();
        console.log('Parsed stopData', stopData);
        if (!stopData || !stopData.stopId) {
          throw new Error("stopId not found in response");
        }
        const { stopId } = stopData;

        // Get all trip update data
        const tripUpdatesUrl = 'https://passio3.com/harvard/passioTransit/gtfs/realtime/tripUpdates.json';
        console.log(`Fetching trip updates from ${tripUpdatesUrl}`);
        const tripUpdatesResponse = await fetch(tripUpdatesUrl);
        console.log('Received tripUpdatesResponse', tripUpdatesResponse);
        if (!tripUpdatesResponse.ok) {
          throw new Error(`HTTP error! status: ${tripUpdatesResponse.status}`);
        }
        const tripUpdatesData: ApiResponse = await tripUpdatesResponse.json();
        console.log('Parsed tripUpdatesData', tripUpdatesData);

        // Filter and map the updates to fetch additional route details
        const updatesPromises = tripUpdatesData.entity
          .filter(entity => !entity.is_deleted)
          .filter(entity => entity.trip_update.stop_time_update.some(stu => stu.stop_id === stopId))
          .map(async entity => {
            console.log('Processing entity', entity);
            const tripId = entity.trip_update.trip.trip_id;
            const arrivalTimeUpdate = entity.trip_update.stop_time_update.find(stu => stu.stop_id === stopId);
            const arrivalTime = arrivalTimeUpdate ? new Date(arrivalTimeUpdate.arrival.time * 1000).toLocaleTimeString() : 'Unknown';
            console.log(`Arrival time for trip ID ${tripId}: ${arrivalTime}`);

            // Fetch the route_long_name using the trip ID
            const routeNameResponse = await fetch(`/api/getRouteNameFromTripId?trip_id=${tripId}`);
            console.log('Received routeNameResponse', routeNameResponse);
            if (!routeNameResponse.ok) {
              throw new Error(`HTTP error! status: ${routeNameResponse.status}`);
            }
            const routeNameData = await routeNameResponse.json();
            console.log('Parsed routeNameData', routeNameData);
            if (!routeNameData || !routeNameData.route_long_name) {
              throw new Error("route_long_name not found in response");
            }
            const routeLongName = routeNameData.route_long_name;

            return {
              name: routeLongName,
              eta: arrivalTime,
              details: arrivalTime === 'Unknown' ? 'Arrival time unknown' : `Arriving at ${arrivalTime}`
            };
          });

        console.log('Awaiting updatesPromises');
        // Resolve all the promises from the mapping
        const updatesWithRouteNames = await Promise.all(updatesPromises);
        console.log('Updates with route names', updatesWithRouteNames);

        // Sort and slice the updates
        const relevantUpdates = updatesWithRouteNames
          .sort((a, b) => {
            const timeA = a.eta !== 'Unknown' ? new Date(a.eta).getTime() : Number.MAX_SAFE_INTEGER;
            const timeB = b.eta !== 'Unknown' ? new Date(b.eta).getTime() : Number.MAX_SAFE_INTEGER;
            return timeA - timeB;
          })
          .slice(0, 3);
        console.log('Relevant updates after sorting and slicing', relevantUpdates);

        setShuttleOptions(relevantUpdates);
      } catch (error) {
        console.error("Failed to fetch shuttle info:", error);
      }
    };

    fetchShuttles();
  }, [stopName]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-black">Upcoming Shuttles</h3>
      {shuttleOptions.length === 0 ? (
        <div className="text-black">No shuttles available at this time</div>
      ) : (
        <div className="flex flex-col text-black">
          {shuttleOptions.map((option, index) => (
            <button
              key={index}
              className={`mb-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-200 ${selectedRoute === index ? 'bg-gray-300' : ''}`}
              onClick={() => setSelectedRoute(index)}
            >
              <p><strong>Bus:</strong> {option.name}</p>
              <p><strong>Arrives:</strong> {option.eta}</p>
              {/* <p><strong>Details:</strong> {option.details}</p> */}
              <AlertButton />
            </button>
          ))}
        </div>
      )}
      {selectedRoute !== null && (
        <Ticket
          show={true}
          onClose={() => setSelectedRoute(null)}
          content={shuttleOptions[selectedRoute]}
          // Not sure if I need these
          currentStopName={stopName}
          destinationStopName={}
        />
      )}
    </div>
  )};
