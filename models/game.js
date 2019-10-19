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
    os: Joi.string().required(),
    processor: Joi.string().required(),
    memory: Joi.string().required(),
    graphics: Joi.string().required(),
    network: Joi.string().required(),
    storage: Joi.string().required()
  });

  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    system_requirements: Joi.object().keys({
      minimum: sysReqSchema,
      recommended: sysReqSchema
    }),
    dev: Joi.array()
      .items(Joi.string())
      .required(),
    publisher: Joi.string().required(),
    hours_of_play: Joi.number().required(),
    release_date: Joi.date().required(),
    steam_rate: Joi.string().required(),
    wt_rate: Joi.string().required(),
    genre: Joi.array()
      .items(Joi.string())
      .required(),
    platforms: Joi.array()
      .items(Joi.string())
      .required(),
    engine: Joi.string().required(),
    pegi_rating: Joi.number().required()
  });
  return Joi.validate(game, schema);
};

module.exports = {
  validate,
  gameSchema,
  gameModel
};
