const express = require("express");
const router = express.Router();
const towns = require("./towns");
const foodOptions = require("./foodOptions");

router.route("/").get((req, res) => {
  res.status(200);
  res.send("Hi");
});
router.use("/towns", towns);
router.use("/food", foodOptions);
module.exports = router;
