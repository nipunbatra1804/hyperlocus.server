const express = require("express");
const { Town } = require("../models");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const { query } = req;
  const towns = await Town.findAll({});
  return res.json(towns);
});

module.exports = router;
