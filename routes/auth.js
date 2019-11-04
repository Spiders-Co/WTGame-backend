require("dotenv").config();
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { userModel } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password .. ");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Email or Password .. ");

  res.status(200).send({ token: user.genAuthToken() });
});

const validate = req => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });
  return schema.validate(req);
};

module.exports = router;
