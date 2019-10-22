const express = require("express");
const router = express.Router();
const { validate } = require("../models/game");
const Game = require("../controllers/game");

router.get("/", async (req, res) => {
  res.send(await Game.getAll());
});

router.get("/:id", async (req, res) => {
  const game = await Game.getOne(req.params.id);
  if (!game || game.length === 0)
    return res.status(404).send("Game Not Found ...");
  res.send(game);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    //     const errorMsgs = error.details.reduce(item => {
    //       return acc + item.message;
    //     }, (acc = ""));
    return res.status(400).send(error.details.map(item => item.message));
  }

  const game = await Game.create(req.body);
  res.send(game);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send(error.details.map(item => item.message)[0].trim());
  const game = await Game.update(req.params.id, req.body);
  res.send(game);
});

router.delete("/:id", async (req, res) => {
  const game = await Game.deleteOne(req.params.id);
  if (!game || game.length === 0)
    return res.status(404).send("Game Not Found ...");
  res.send(game);
});

module.exports = router;
