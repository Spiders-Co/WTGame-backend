const gameDebug = require("debug")("app:game-control");
const { gameModel } = require("../models/game");
const mongoose = require("mongoose");

const getAll = async () => {
  return await gameModel.find();
};

const getOne = async id => {
  const game = await gameModel.find({
    _id: mongoose.Types.ObjectId(id)
  });
  if (!game) return;
  return game;
};

const create = async game => {
  const newGame = new gameModel(game);
  try {
    const result = await newGame.save();
    return result;
  } catch (err) {
    throw new Error(`create Error : ${err.message}`);
  }
};

const update = async (id, newGame) => {
  const game = await gameModel.findByIdAndUpdate(
    id,
    { $set: newGame },
    { new: true }
  );
  if (!game) return;
  return game;
};

const deleteOne = async id => {
  const game = await gameModel.findByIdAndDelete(id);
  if (!game) return;
  return game;
};

module.exports = {
  create,
  getAll,
  getOne,
  deleteOne,
  update
};
