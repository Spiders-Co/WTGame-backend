const mongoose = require("mongoose");
require("mongoose-type-url");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const userGamesSchema = new mongoose.Schema({
  gameId: mongoose.Schema.Types.ObjectId,
  rate: { type: Number, default: 0 },
  review: { type: String, default: "" },
  playHours: { type: Number, default: 0 },
  status: { type: String, default: "" } // maybe ObjectID
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
  games: [userGamesSchema],
  avatar: { type: mongoose.SchemaTypes.Url }
});

userSchema.methods.genAuthToken = function() {
  return jwt.sign({ _id: this._id }, process.env.JWTPASS);
};

const userModel = mongoose.model("User", userSchema);

const validate = user => {
  const gameSchema = Joi.object().keys({
    gameId: Joi.objectId(),
    rate: Joi.number(),
    review: Joi.string(),
    playHours: Joi.number(),
    status: Joi.string() // maybe ObjectID
  });
  const schema = Joi.object().keys({
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
    avatar: Joi.string().uri()
  });

  return schema.validate(user); // Joi.validate(user, schema);
};

module.exports = {
  validate,
  userModel
};
