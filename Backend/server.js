// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sudokuRoutes = require('./routes/sudokuRoutes');


dotenv.config();
const app = express();
app.use(express.json());



const allowedOrigins = [
  'http://127.0.0.1:5500',   // live server
  'http://localhost:5500',   // some setups use localhost
  'null',                      // allow file:// (no origin)
  'https://uditdiwani.github.io',
  'https://uditdiwani.github.io/ALL-IN-ONE-Sudoku/UserSetUp.html'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

// Start the server after connecting to the database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB error');
    process.exit(1);
  }
};

startServer();
