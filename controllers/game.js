const gameDebug = require("debug")("app:game-control");
const { gameModel } = require("../models/game");

const getGames = async () => {
  return await gameModel.find();
};

const createGame = async data => {
  const newGame = new gameModel(data);
  try {
    const result = await newGame.save();
    // gameDebug(`created game : ${result}`);
    return result;
  } catch (err) {
    throw new Error(`create Error : ${err.message}`);
  }
};

module.exports = {
  createGame,
  getGames
};
