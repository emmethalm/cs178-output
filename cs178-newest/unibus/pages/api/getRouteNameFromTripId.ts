// Next.js API route to get route_long_name for trip_id
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db;
  try {
    db = await open({ filename: './scripts/static_data.sqlite3', driver: sqlite3.Database });
    const tripId = req.query.trip_id;

    if (!tripId) {
      console.error('No trip_id provided in the request query');
      res.status(400).json({ error: 'No trip_id provided' });
      return;
    }

    const busName = await db.get(`
      SELECT r.route_long_name
      FROM trips t
      JOIN routes r ON t.route_id = r.route_id
      WHERE t.trip_id = ?`, [tripId]);

    if (busName) {
      res.status(200).json({ route_long_name: busName.route_long_name });
    } else {
      console.error(`busName not found for trip_id: ${tripId}`);
      res.status(404).json({ error: 'busName not found' });
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Error querying the database' });
  } finally {
    if (db) {
      try {
        await db.close();
      } catch (closeError) {
        console.error('Error closing the database connection:', closeError);
      }
    }
  }
}