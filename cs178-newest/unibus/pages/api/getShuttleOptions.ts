// Next.js API route to get stop_id from stop_name
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: 'static_data.sqlite3', driver: sqlite3.Database });
  const stopName = req.query.stop_name;

  try {
    const stop = await db.get('SELECT stop_id FROM stops WHERE stop_name = ?', [stopName]);
    res.status(200).json({ stopId: stop?.stop_id });
  } catch (error) {
    res.status(500).json({ error: 'Error querying the database' });
  } finally {
    await db.close();
  }
}
