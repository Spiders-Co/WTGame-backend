const mongoose = require('mongoose');

const userGamesSchema = new mongoose.Schema({
  gameId: ObjectID,
  rate: Number,
  review: String,
  playHours: Number,
  status: String // maybe ObjectID
});
const userSchema = new mongoose.Schema({
  firstName: String,
  lastname: String,
  email: String,
  password: String,
  role: String,
  games: [userGamesSchema],
  avatar: String
});

export const Cource = mongoose.model('User', userSchema);
