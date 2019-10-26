const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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

const validate = user => {
  const gameSchema = {
    gameId: Joi.ObjectID(),
    rate: Joi.number(),
    review: Joi.string(),
    playHours: Joi.number(),
    status: Joi.string() // maybe ObjectID
  };
  const schema = {
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(30),
    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    role: Joi.string(),
    games: Joi.array().items(gameSchema),
    avatar: Joi.string()
  };
  return Joi.validate(user, schema);
};

const Cource = mongoose.model("User", userSchema);

module.exports = {
  validate,
  userModel
};
