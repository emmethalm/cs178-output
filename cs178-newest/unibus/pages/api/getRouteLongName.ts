// input routeId, output long_route_name
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: './scripts/static_data.sqlite3', driver: sqlite3.Database });
  const routeId = req.query.route_id;

  try {
    const route = await db.get('SELECT route_long_name FROM routes WHERE route_id = ?', [routeId]);
    if (route) {
      res.status(200).json({ route_long_name: route.route_long_name });
    } else {
      res.status(404).json({ error: 'Route not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error querying the database' });
  } finally {
    await db.close();
  }
}
