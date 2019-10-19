const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("What The Gaaame !!!!!");
});

module.exports = router;
