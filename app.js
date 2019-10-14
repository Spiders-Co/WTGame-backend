require("dotenv").config();
const debug = require("debug")("app:StartUp");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, debug(`App is running on port ${PORT}`));
