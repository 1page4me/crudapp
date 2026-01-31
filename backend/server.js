/**
 * Import core dependencies
 */
const cors = require('cors');
const express = require('express');
const poolPromise = require('./db'); // Shared PostgreSQL connection pool

/**
 * Initialize Express application
 */

const app = express();
const port = 3000;
let pool;
/**
 * Middleware
 * - Parse incoming JSON payloads
 */
app.use(express.json());
app.use(cors());


(async () => {
  pool = await poolPromise;
})();


/**
 * Optional: format JSON responses for readability (useful in development)
 */
app.set('json spaces', 2);

/**
 * Start the HTTP server
 */
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/**
 * Health check / root endpoint
 * Useful for verifying server is up
 */
app.get('/', (req, res) => {
  res.send('Hello, your request has been received!');
});

/**
 * GET /users
 * Fetch all users from the database
 */
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * POST /users
 * Create a new user
 */
app.post('/users', async (req, res) => {
  const { name } = req.body;

  // Basic input validation
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * DELETE /users/:id
 * Delete a user by ID
 */
app.delete(`/users/:id`, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );

    // Handle case where user does not exist
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

/**
 * PUT /users/:id
 * Update a user by ID
 */
app.put(`/users/:id`, async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" })
  }
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [name, id]
    );
    res.status(200).json({
      success: true,
      data: result.rows[0],
    })
  }
  catch (error) {
    console.log('Database error:', error);
    res.status(500).json({ error: "Failed to update user" });
  }

})