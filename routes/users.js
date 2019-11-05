const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { userModel, validate } = require("../models/user");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  // Check authorization
  const user = await userModel.findById(req.user._id);
  if (user.role != "admin") return res.status(401).send("Access Denied .. ");

  //get all the users from the database
  res.send(await userModel.find());
});

router.get("/:id", async (req, res) => {
  try {
    // search for user in the database
    const user = await userModel.findById(req.params.id);
    if (!user) res.status(404).send("User was not found!");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  // validate the data
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await userModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Exists .. ");

  // add user to the database
  user = new userModel(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.header("x-auth-token", user.genAuthToken()).send(user);
});

router.put("/:id", async (req, res) => {
  //Search for the course
  // validate
  // uodate and return
});

router.delete("/:id", async (req, res) => {
  let user = await userModel.findById(req.params.id);
  if (!user) res.status(404).send("User was not found!");

  try {
    user = await userModel.findByIdAndDelete(req.params.id);
    // console.log(`user : ${user}`);
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
