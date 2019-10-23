const mongoose = require("mongoose");
const Joi = require("joi");

const sysReqSchema = mongoose.Schema({
  os: String,
  processor: String,
  memory: String,
  graphics: String,
  network: String,
  storage: String
});

const systemRequirementSchema = mongoose.Schema({
  minimum: { type: sysReqSchema },
  recommended: { type: sysReqSchema }
});

const gameSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  system_requirements: { type: systemRequirementSchema },
  dev: [{ type: String }],
  publisher: String,
  hours_of_play: Number,
  release_date: Date,
  steam_rate: Number,
  wt_rate: Number,
  genre: [{ type: String }],
  platforms: [{ type: String }],
  engine: String,
  pegi_rating: Number
});

const gameModel = mongoose.model("Game", gameSchema);

const validate = game => {
  const sysReqSchema = Joi.object().keys({
    os: Joi.string(),
    processor: Joi.string(),
    memory: Joi.string(),
    graphics: Joi.string(),
    network: Joi.string(),
    storage: Joi.string()
  });

  const schema = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    system_requirements: Joi.object().keys({
      minimum: sysReqSchema,
      recommended: sysReqSchema
    }),
    dev: Joi.array().items(Joi.string()),
    publisher: Joi.string(),
    hours_of_play: Joi.number(),
    release_date: Joi.date(),
    steam_rate: Joi.number(),
    wt_rate: Joi.number(),
    genre: Joi.array().items(Joi.string()),
    platforms: Joi.array().items(Joi.string()),
    engine: Joi.string(),
    pegi_rating: Joi.number()
  });
  return Joi.validate(game, schema);
};

module.exports = {
  validate,
  gameSchema,
  gameModel
};
