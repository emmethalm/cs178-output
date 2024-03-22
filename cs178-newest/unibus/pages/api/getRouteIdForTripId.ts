// Next.js API route to get route_id for trip_id
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: './scripts/static_data.sqlite3', driver: sqlite3.Database });
  const routeId = req.query.route_id;
  console.log("stopName", routeId);

  try {
    const trip = await db.get('SELECT route_id FROM trips WHERE trip_id = ?', [routeId]);
    res.status(200).json({ tripId: trip?.trip_id });
    // Not printing
    console.log("tripId: ", trip);

  } catch (error) {
    res.status(500).json({ error: 'Error querying the database' });
  } finally {
    await db.close();
    console.log("Database closed.");
  }
}