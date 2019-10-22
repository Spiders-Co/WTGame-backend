const mongoose = require("mongoose");
const Joi = require("joi");

const sysReqSchema = mongoose.Schema({
  os: { type: String, required: true },
  processor: { type: String, required: true },
  memory: { type: String, required: true },
  graphics: { type: String, required: true },
  network: { type: String, required: true },
  storage: { type: String, required: true }
});

const systemRequirementSchema = mongoose.Schema({
  minimum: { type: sysReqSchema },
  recommended: { type: sysReqSchema }
});

const gameSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  system_requirements: { type: systemRequirementSchema, required: true },
  dev: [{ type: String, required: true }],
  publisher: { type: String, required: true },
  hours_of_play: { type: Number, required: true },
  release_date: { type: Date, required: true },
  steam_rate: { type: String, required: true },
  wt_rate: { type: String, required: true },
  genre: [{ type: String, required: true }],
  platforms: [{ type: String, required: true }],
  engine: { type: String, required: true },
  pegi_rating: { type: Number, required: true }
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
    steam_rate: Joi.string(),
    wt_rate: Joi.string(),
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
