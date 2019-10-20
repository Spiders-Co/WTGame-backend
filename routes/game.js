const express = require("express");
const router = express.Router();
const { validate } = require("../models/game");
const Game = require("../controllers/game");

router.get("/", async (req, res) => {
  res.send(await Game.getGames());
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    //     const errorMsgs = error.details.reduce(item => {
    //       return acc + item.message;
    //     }, (acc = ""));
    return res.status(400).send(error.details.map(item => item.message));
  }

  const game = await Game.createGame(req.body);
  res.send(game);
});

module.exports = router;
