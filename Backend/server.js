// server.js
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5500',
  optionsSuccessStatus: 200
};

// Apply CORS middleware with options
app.use(cors(corsOptions));
// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/api/board', (req, res) => {
  console.log('Received board:', req.body.board);
  res.json({ status: 'success', board: req.body.board });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
