const User = require('../models/User');

// Save sudoku progress
const saveSudoku = async (req, res) => {
  try {

    const { userId, puzzle, defaultindeces, board, elapsedTime, isCompleted } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.sudoku = { puzzle, defaultindeces, board, elapsedTime, isCompleted };
    await user.save();

    res.json({ message: 'Sudoku progress saved', sudoku: user.sudoku });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving sudoku' });
  }
};

// Load sudoku progress
const loadSudoku = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.sudoku);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error loading sudoku' });
  }
};

module.exports = { saveSudoku, loadSudoku };
