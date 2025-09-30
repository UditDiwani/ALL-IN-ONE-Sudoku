const express = require('express');
const { saveSudoku, loadSudoku } = require('../controllers/sudokuController');

const router = express.Router();

// Save sudoku progress
router.post('/save', saveSudoku);

// Load sudoku progress
router.get('/load/:userId', loadSudoku);

module.exports = router;
