const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');

// Define your database file location
const dbPath = path.resolve(__dirname, 'static_data.sqlite3');
const db = new sqlite3.Database(dbPath);

// Define your .txt files location
const dataFiles = {
  agency: '../liveData/agency.txt',
  calendar_dates: '../liveData/calendar_dates.txt',
  stop_times: '../liveData/stop_times.txt',
  shapes: '../liveData/shapes.txt',
  trips: '../liveData/trips.txt',
  feed_info: '../liveData/feed_info.txt',
  stops: '../liveData/stops.txt',
  calendar: '../liveData/calendar.txt',
  routes: '../liveData/routes.txt',
};

// SQL to create tables if they don't exist
const createTableSQL = {
  agency: `CREATE TABLE IF NOT EXISTS agency (
    agency_id TEXT,
    agency_name TEXT,
    agency_url TEXT,
    agency_timezone TEXT,
    agency_lang TEXT,
    agency_phone TEXT,
    agency_fare_url TEXT
  );`,
  calendar_dates: `CREATE TABLE IF NOT EXISTS calendar_dates (
    service_id TEXT,
    date TEXT,
    exception_type INTEGER
  );`,
  stop_times: `CREATE TABLE IF NOT EXISTS stop_times (
    trip_id TEXT,
    arrival_time TEXT,
    departure_time TEXT,
    stop_id TEXT,
    stop_sequence INTEGER,
    stop_headsign TEXT,
    pickup_type INTEGER,
    drop_off_type INTEGER,
    shape_dist_traveled REAL
  );`,
  shapes: `CREATE TABLE IF NOT EXISTS shapes (
    shape_id TEXT,
    shape_pt_lat REAL,
    shape_pt_lon REAL,
    shape_pt_sequence INTEGER,
    shape_dist_traveled REAL
  );`,
  trips: `CREATE TABLE IF NOT EXISTS trips (
    route_id TEXT,
    service_id TEXT,
    trip_id TEXT,
    trip_headsign TEXT,
    direction_id INTEGER,
    block_id TEXT,
    shape_id TEXT
  );`,
  feed_info: `CREATE TABLE IF NOT EXISTS feed_info (
    feed_publisher_name TEXT,
    feed_publisher_url TEXT,
    feed_lang TEXT,
    feed_start_date TEXT,
    feed_end_date TEXT,
    feed_version TEXT
  );`,
  stops: `CREATE TABLE IF NOT EXISTS stops (
    stop_id TEXT PRIMARY KEY,
    stop_code TEXT,
    stop_name TEXT,
    stop_desc TEXT,
    stop_lat REAL,
    stop_lon REAL,
    stop_url TEXT,
    location_type INTEGER,
    stop_timezone TEXT,
    wheelchair_boarding INTEGER,
    platform_code TEXT
  );`,
  calendar: `CREATE TABLE IF NOT EXISTS calendar (
    service_id TEXT,
    monday INTEGER,
    tuesday INTEGER,
    wednesday INTEGER,
    thursday INTEGER,
    friday INTEGER,
    saturday INTEGER,
    sunday INTEGER,
    start_date TEXT,
    end_date TEXT
  );`,
  routes: `CREATE TABLE IF NOT EXISTS routes (
    route_id TEXT,
    agency_id TEXT,
    route_short_name TEXT,
    route_long_name TEXT,
    route_desc TEXT,
    route_type INTEGER,
    route_url TEXT,
    route_color TEXT,
    route_text_color TEXT
  );`,
};

// Function to create tables
const createTables = () => {
  Object.keys(createTableSQL).forEach((key) => {
    db.run(createTableSQL[key], (err) => {
      if (err) {
        console.error(`Error creating ${key} table:`, err);
      } else {
        console.log(`${key} table created successfully`);
      }
    });
  });
};

// Function to import data from .txt files
const importData = () => {
  Object.entries(dataFiles).forEach(([tableName, fileName]) => {
    const filePath = path.resolve(__dirname, fileName);
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        const columns = Object.keys(row).join(', ');
        const placeholders = Object.keys(row).map(() => '?').join(', ');
        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        db.run(sql, Object.values(row), (err) => {
          if (err) {
            console.error(`Error inserting into ${tableName}:`, err);
          }
        });
      })
      .on('end', () => {
        console.log(`Data imported successfully into ${tableName}`);
      });
  });
};

// Main function to setup database
const setupDatabase = () => {
  db.serialize(() => {
    createTables();
    // Delay to ensure tables are created before data import
    setTimeout(importData, 5000);
  });
};

setupDatabase();

// Close the database connection when done
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
