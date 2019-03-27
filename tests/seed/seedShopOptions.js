const { Shop, Tag } = require("../../models");
const crs = { type: "name", properties: { name: "EPSG:4326" } };

const createShops = async () => {
  const tagGoodFood = await Tag.create({ name: "goodFood" });
  const tagHealthier = await Tag.create({ name: "healthier" });
  await Shop.create(
    {
      name: "ChinaTown Point",
      type: "Shopping Mall",
      address: "28 Kreta Ayer Road",
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
  ).then(rest => rest.addTags(tagGoodFood));
  await Shop.create(
    {
      name: "Clarke Silly",
      type: "boutique",
      address: "1 Jalan Kukoh",
      postalCode: 161001,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.826013282121, 1.28000483731102],
        crs: crs
      },
      tags: [{ name: "romance" }, { name: "cheap" }]
    },
    { include: [Tag] }
  );
  await Shop.create(
    {
      name: "ThoughtProvokes",
      type: "Showroom",
      address: "42/43 Pekin Street, FarEast Square",
      postalCode: 49959,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.955419467871, 1.3214476908532],
        crs: crs
      },
      tags: [{ name: "hipster" }]
    },
    { include: [Tag] }
  ).then(res => res.addTags([tagHealthier]));

  await Shop.create(
    {
      name: "Googlie",
      type: "Showroom",
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

module.exports = createShops;
