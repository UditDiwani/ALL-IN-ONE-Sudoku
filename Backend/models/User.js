const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  sudoku: {
    puzzle: {
      type: [[Number]], // original puzzle
      default: []       // empty by default
    },
    defaultindeces: {
      type: [[Number]],
      default: []
    },
    board: {
      type: [[Number]], // current state
      default: []
    },
    elapsedTime: {
      type: Number,
      default: 0
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with stored hash
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
