const User = require('../models/User');
// Save sudoku progress
const saveSudoku = async (req, res) => {
  try {

    const { userId, puzzle, defaultindeces, board, elapsedTime, isCompleted, mistakes } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.sudoku = { puzzle, defaultindeces, board, elapsedTime, isCompleted, mistakes: mistakes || 0 };
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

const deleteSudoku = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
     if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User account and progress deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user account." });
  }
}

module.exports = { saveSudoku, loadSudoku, deleteSudoku };
