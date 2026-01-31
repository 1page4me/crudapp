async function ensureTables(pool) {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT NOT NULL);`);
    console.log('Tables ensured')
}
module.exports = { ensureTables };