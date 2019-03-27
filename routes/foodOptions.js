const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

const { FoodOption, Tag } = require("../models/");

router.route("/").get(async (req, res) => {
  const { query } = req;
  let foodOptions;
  if (Object.entries(query).length === 0) {
    foodOptions = await FoodOption.findAll({
      include: [Tag]
    });
  } else {
    const { name, tag, location } = query;
    if (name) {
      foodOptions = await FoodOption.findAll({
        where: { name: name },
        include: [Tag]
      });
    }
    if (tag) {
      foodOptions = await FoodOption.findAll({
        include: [{ model: Tag, where: { name: tag } }]
      });
    }
    if (location) {
      foodOptions = await FoodOption.findAll({
        where: Sequelize.where(
          Sequelize.fn(
            "ST_DWithin",
            Sequelize.col("location"),
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                location.coord[0],
                location.coord[1]
              ),
              4326
            ),
            0.1
          ),
          true
        )
      });
    }
  }

  res.json(foodOptions);
});

module.exports = router;
