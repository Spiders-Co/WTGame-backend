require("dotenv").config();
const StartDebug = require("debug")("app:startUp");
const devDebug = require("debug")("app:dev");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const app = express();
const PORT = process.env.PORT || 5001;

if (app.get("env") === "development") {
  StartDebug(app.get("env"));
  app.use(morgan("tiny"));
  StartDebug("Morgan Enabled...");
}

// Connection to MongoDB
// connection string from mlab
// Using NodeJS 3.0 or later
// `mongodb://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PASSWORD}@${process.env.CLUSTER_NAME}-hv03g.mongodb.net/test?retryWrites=true&w=majority`,

mongoose
  .connect(
    `mongodb://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PASSWORD}@${process.env.CLUSTER_NAME}-shard-00-00-hv03g.mongodb.net:27017,${process.env.CLUSTER_NAME}-shard-00-01-hv03g.mongodb.net:27017,${process.env.CLUSTER_NAME}-shard-00-02-hv03g.mongodb.net:27017/test?ssl=true&replicaSet=${process.env.CLUSTER_NAME}-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(res => devDebug("Connected to MLab Successfully ...."))
  .catch(err => devDebug(`Error Connection : ${err.message}`));

// routes
const home = require("./routes/home");
const games = require("./routes/game");
const users = require("./routes/users");
const auth = require("./routes/auth");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// api endpoints
app.use("/", home);
app.use("/api/games", games);
app.use("/api/users", users);
app.use("/api/sign-in", auth);

app.listen(PORT, StartDebug(`App is running on port ${PORT}`));
