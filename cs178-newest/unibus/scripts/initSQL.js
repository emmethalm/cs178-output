const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');

// Define your database file location
const dbPath = path.resolve(__dirname, 'static_data.sqlite3');
const db = new sqlite3.Database(dbPath);

// Define your .txt files location
const dataFiles = {
  trips: '../liveData/trips.txt',
  calendar_dates: '../liveData/calendar_dates.txt',
  stop_times: '../liveData/stop_times.txt',
  shapes: '../liveData/shapes.txt',
  stops: '../liveData/stops.txt',
  calendar: '../liveData/calendar.txt',
  routes: '../liveData/routes.txt',
};

// SQL to create tables if they don't exist
const createTableSQL = {
  trips: `CREATE TABLE IF NOT EXISTS trips (
    route_id TEXT,
    service_id TEXT,
    trip_id TEXT,
    trip_headsign TEXT,
    trip_short_name TEXT,
    direction_id INTEGER,
    block_id TEXT,
    shape_id TEXT,
    wheelchair_accessible INTEGER,
    bikes_allowed INTEGER
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
    timepoint INTEGER
  );`,
  shapes: `CREATE TABLE IF NOT EXISTS shapes (
    shape_id TEXT,
    shape_pt_lat REAL,
    shape_pt_lon REAL,
    shape_pt_sequence INTEGER,
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
    route_type INTEGER,
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

const importData = () => {
    return Promise.all(
      Object.entries(dataFiles).map(([tableName, fileName]) => {
        return new Promise((resolve, reject) => {
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
                  reject(err);
                }
              });
            })
            .on('end', () => {
              console.log(`Data imported successfully into ${tableName}`);
              resolve();
            });
        });
      })
    );
  };
  
  const setupDatabase = async () => {
    try {
      await createTables();
      await importData();
    } catch (error) {
      console.error('Error setting up database:', error);
    } finally {
      db.close((err) => {
        if (err) {
          console.error('Error closing database connection:', err);
        } else {
          console.log('Database connection closed.');
        }
      });
    }
  };
  
  setupDatabase();