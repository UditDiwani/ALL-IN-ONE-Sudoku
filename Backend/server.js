// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sudokuRoutes = require('./routes/sudokuRoutes');


dotenv.config();
connectDB();
const app = express();
app.use(express.json());



const allowedOrigins = [
  'http://127.0.0.1:5500',   // live server
  'http://localhost:5500',   // some setups use localhost
  "null",                      // allow file:// (no origin)
];

app.use(cors({
  origin: function (origin, callback) {
    if (origin==null || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin); // debug
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

const PORT = process.env.PORT || 3000;



app.use('/api/sudoku', sudokuRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/sudoku/load', (req,res)=>{
  console.log('Request: ',req);
  console.log('Response: ',res);
});

app.post('/api/board', (req, res) => {
  console.log('Received board:', req.body.board);
  res.json({ status: 'success', board: req.body.board });
});
app.get('/api', (req, res) => {
  res.json({ ok: true, message: "Backend is running!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
