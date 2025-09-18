

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Create table if not exists
pool.query('CREATE TABLE IF NOT EXISTS names (id SERIAL PRIMARY KEY, name TEXT NOT NULL)', (err) => {
  if (err) console.error('Failed to create table', err);
});

app.get('/names', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM names');
    res.json(result.rows.map(row => row.name));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch names' });
  }
});

app.post('/names', async (req, res) => {
  const { name } = req.body;
  if (name) {
    try {
      await pool.query('INSERT INTO names(name) VALUES($1)', [name]);
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add name' });
    }
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
