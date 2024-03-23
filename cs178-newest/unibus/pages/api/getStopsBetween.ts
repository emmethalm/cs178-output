import { NextApiRequest, NextApiResponse } from 'next';

interface StopTimeUpdate {
  stop_id: string;
  arrival: {
    time: number;
  };
}

interface TripUpdate {
  trip: {
    trip_id: string;
  };
  stop_time_update: StopTimeUpdate[];
}

interface Entity {
  is_deleted: boolean;
  trip_update: TripUpdate;
}

interface ApiResponse {
  entity: Entity[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { currentStopName, destinationStopName } = req.query;

  if (!currentStopName || !destinationStopName) {
    res.status(400).json({ error: 'Missing currentStopName or destinationStopName query parameters' });
    return;
  }

  try {
    // Assuming we have a function to get the trip_id from a stop name
    const currentStopTripId = await getTripIdFromStopName(currentStopName as string);
    const destinationStopTripId = await getTripIdFromStopName(destinationStopName as string);

    if (!currentStopTripId || !destinationStopTripId) {
      res.status(404).json({ error: 'Stop name not found' });
      return;
    }

    // Fetch all upcoming stops from the PassioGo API
    const tripUpdatesUrl = 'https://passio3.com/harvard/passioTransit/gtfs/realtime/tripUpdates.json';
    const tripUpdatesResponse = await fetch(tripUpdatesUrl);
    if (!tripUpdatesResponse.ok) {
      throw new Error(`HTTP error! status: ${tripUpdatesResponse.status}`);
    }
    const tripUpdatesData: ApiResponse = await tripUpdatesResponse.json();

    // Filter for the trip_id and get all stops until the destination
    const stopsBetween = tripUpdatesData.entity
      .filter((entity: Entity) => !entity.is_deleted && entity.trip_update.trip.trip_id === currentStopTripId)
      .flatMap((entity: Entity) => entity.trip_update.stop_time_update)
      .filter((stopTimeUpdate: StopTimeUpdate) => stopTimeUpdate.stop_id >= currentStopTripId && stopTimeUpdate.stop_id <= destinationStopTripId)
      .map((stopTimeUpdate: StopTimeUpdate) => ({ name: stopTimeUpdate.stop_id, time: new Date(stopTimeUpdate.arrival.time * 1000).toLocaleTimeString() }));

    res.status(200).json(stopsBetween);
  } catch (error) {
    console.error('Failed to fetch stops between:', error);
    res.status(500).json({ error: 'Failed to fetch stops between' });
  }
}

// Helper function to get trip_id from stop name
async function getTripIdFromStopName(stopName: string): Promise<string | null> {
  const sqlite3 = require('sqlite3');
  const { open } = require('sqlite');

  let db;
  try {
    db = await open({
      filename: './scripts/static_data.sqlite3',
      driver: sqlite3.Database
    });

    const stop = await db.get(`
      SELECT st.trip_id
      FROM stops s
      JOIN stop_times st ON s.stop_id = st.stop_id
      WHERE s.stop_name = ?
      LIMIT 1
    `, [stopName]);

    return stop ? stop.trip_id : null;
  } catch (error) {
    console.error('Error querying the database for trip_id:', error);
    return null;
  } finally {
    if (db) {
      await db.close();
    }
  }
}