const { FoodOption, Tag } = require("../../models");
const crs = { type: "name", properties: { name: "EPSG:4326" } };

const createFoodOptions = async () => {
  const tagFastFood = await Tag.create({ name: "fastFood" });
  const tagHealthier = await Tag.create({ name: "healthier" });
  await FoodOption.create(
    {
      name: "Pizza Hut",
      type: "restaurant",
      address: "29 Kreta Ayer Road",
      postalCode: 88996,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.820383057662, 1.25134813803727],
        crs: crs
      },
      tags: [{ name: "great for kids" }]
    },
    { include: [Tag] }
  ).then(rest => rest.addTags(tagFastFood));
  await FoodOption.create(
    {
      name: "rice garden",
      type: "stall",
      address: "1 Jalan Kukoh",
      postalCode: 161001,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.826013282121, 1.28000483731102],
        crs: crs
      },
      tags: [{ name: "hawker" }, { name: "cheap" }]
    },
    { include: [Tag] }
  );
  await FoodOption.create(
    {
      name: "subway",
      type: "restaurant",
      address: "42/43 Pekin Street, FarEast Square",
      postalCode: 49959,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.955419467871, 1.3214476908532],
        crs: crs
      },
      tags: [{ name: "fastFood" }]
    },
    { include: [Tag] }
  ).then(res => res.addTags([tagHealthier]));

  await FoodOption.create(
    {
      name: "Sushi Tei",
      type: "restaurant",
      address: "20 Cross Street",
      postalCode: 48422,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.894731355106, 1.31886941200841],
        crs: crs
      },
      tags: [{ name: "japanese" }]
    },
    { include: [Tag] }
  ).then(async rest => {
    const [tag, created] = await Tag.findOrCreate({
      where: { name: "healthier" }
    });
    await rest.addTags([tag]);
    return rest;
  });
};

module.exports = createFoodOptions;
