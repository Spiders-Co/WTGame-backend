require("dotenv").config();
const debug = require("debug")("app:StartUp");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

// routes
const home = require("./routes/home");
const games = require("./routes/game");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api endpoints
app.use("/", home);
app.use("/api/games", games);

app.listen(PORT, debug(`App is running on port ${PORT}`));
