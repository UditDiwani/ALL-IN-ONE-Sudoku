const express = require('express');
const { saveSudoku, loadSudoku, deleteSudoku } = require('../controllers/sudokuController');

const router = express.Router();

// Save sudoku progress
router.post('/save', saveSudoku);

// Load sudoku progress
router.get('/load/:userId', loadSudoku);

// Delete sudoku progress
router.delete('/delete/:userId', deleteSudoku)
module.exports = router;
