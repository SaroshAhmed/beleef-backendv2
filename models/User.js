const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  signature: String,
  conjunctionAgent: String,
  googleId: { type: String, required: true, unique: true },
  profileComplete: { type: Boolean, default: false },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
