const express = require("express");
const router = express.Router();
const towns = require("./towns");
const places = require("./places");

router.route("/").get((req, res) => {
  res.status(200);
  res.send("Hi");
});
router.use("/towns", towns);
router.use("/places", places);
module.exports = router;
