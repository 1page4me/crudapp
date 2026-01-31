const { Pool } = require('pg');

// Connect to default postgres DB first
const adminPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'postgres',
});

async function ensureDatabaseExists() {
    const dbName = process.env.DB_NAME;

    const result = await adminPool.query(
        `SELECT 1 FROM pg_database WHERE datname= $1`, [dbName]
    );
    await adminPool.end();
}

module.exports = { ensureDatabaseExists };