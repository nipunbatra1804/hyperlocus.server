const express = require("express");
const router = express.Router();
//const Sequelize = require("");
const { Place, Tag, sequelize } = require("../models");
const SqOp = sequelize.Op;

router
  .route("/")
  .get(async (req, res) => {
    const { query } = req;
    let places;
    if (Object.entries(query).length === 0) {
      places = await Place.findAll({
        include: [Tag]
      });
    } else {
      const { name, tag, loc, distance } = query;
      if (name) {
        places = await Place.findAll({
          where: { name: name },
          include: [Tag]
        });
      }
      if (tag) {
        places = await Place.findAll({
          include: [{ model: Tag, where: { name: tag } }]
        });
      }
      if (loc) {
        places = await Place.findAll({
          where: sequelize.where(
            sequelize.fn(
              "ST_Distance_Sphere",
              sequelize.col("location"),
              sequelize.fn(
                "ST_SetSRID",
                sequelize.fn("ST_MakePoint", loc.coord[0], loc.coord[1]),
                4326
              )
            ),
            "<",
            distance
          )
        });
      }
    }
    res.json(places);
  })
  .post(async (req, res) => {
    try {
      const { place } = req.body;
      const { tags } = place;
      console.log(place);

      const newFoodOption = await Place.create(place);
      if (tags) {
        let newTags = [];
        await Promise.all(
          tags.map(async tag => {
            let [t, created] = await Tag.findOrCreate({
              where: { name: tag.name }
            });
            newTags.push(t);
          })
        );
        await newFoodOption.addTags(newTags);
      }
      const retFoodOption = await Place.findOne({
        where: { id: newFoodOption.id },
        include: [Tag]
      });

      res.status(201).json(retFoodOption);
    } catch (err) {
      res.status(400).json(err.message);
    }
  });

router.route("/:id").patch(async (req, res) => {
  const { tags } = req.body;
  const newObject = req.body;
  delete newObject.tags;
  let newTags = [];
  if (tags) {
    await Promise.all(
      tags.map(async tag => {
        let [t, created] = await Tag.findOrCreate({
          where: { name: tag }
        });
        newTags.push(t);
      })
    );
  }
  const foodOption = await Place.findOne({ where: { id: req.params.id } });
  await foodOption.addTags(newTags);
  const result = await foodOption.update(newObject);

  res.status(202).json(result);
});

module.exports = router;
