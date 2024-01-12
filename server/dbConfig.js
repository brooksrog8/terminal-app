require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

// Function to wait for PostgreSQL to be ready
async function waitForPostgres() {
  const maxAttempts = 10;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      // Attempt to connect to the database
      await pool.query('SELECT NOW()');
      console.log('Connected to PostgreSQL');
      return;
    } catch (error) {
      // Log the error and wait for a moment before trying again
      console.error('Error connecting to PostgreSQL:', error);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
      attempts++;
      console.log(`attempts out of 10: ${attempts}`);
    }
  }

  // If max attempts are reached and still not connected, throw an error
  throw new Error('Unable to connect to PostgreSQL after multiple attempts');
}

// Call the wait function when this module is imported
waitForPostgres();

module.exports = { pool };