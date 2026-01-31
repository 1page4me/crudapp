/**
 * Load environment variables from `.env` into process.env.
 * Required before accessing any configuration values.
 */
require('dotenv').config();

/**
 * Import PostgreSQL connection pool manager.
 * Pooling is used to efficiently reuse DB connections.
 */
const { Pool } = require('pg');
const { ensureDatabaseExists } = require('./db/bootstrap');
const { ensureTables } = reqiure('./db/schema')

/**
 * Create a shared PostgreSQL connection pool.
 * 
 * Configuration is read from environment variables to:
 * - keep credentials out of source code
 * - support different environments (dev/staging/prod)
 */

async function createPool() {
  await ensureDatabaseExists();

  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || 'localhost', // fallback for local development
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // default PostgreSQL port
  });

  await ensureTables(pool);
  return pool;

}


/**
 * Export a single pool instance for reuse across the app.
 * Prevents multiple pools and ensures efficient DB usage.
 */
module.exports = createPool();
