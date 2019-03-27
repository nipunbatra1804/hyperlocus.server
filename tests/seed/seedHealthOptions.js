const { Health, Tag } = require("../../models");
const crs = { type: "name", properties: { name: "EPSG:4326" } };

const createHealthOptions = async () => {
  const tagGoodFood = await Tag.create({ name: "oncology" });
  const tagHealthier = await Tag.create({ name: "pathology" });
  await Health.create(
    {
      name: "ChinaTown Clinic",
      type: "private hospital",
      address: "28 Kreta Ayer Road",
      postalCode: 88996,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.820383057662, 1.25134813803727],
        crs: crs
      },
      tags: [{ name: "pediatrics" }]
    },
    { include: [Tag] }
  ).then(rest => rest.addTags(tagGoodFood));
  await Health.create(
    {
      name: "Clarke Hospital",
      type: "hospital",
      address: "1 Jalan Kukoh",
      postalCode: 161001,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.826013282121, 1.28000483731102],
        crs: crs
      },
      tags: [{ name: "pharmacy" }, { name: "economical" }]
    },
    { include: [Tag] }
  );
  await Health.create(
    {
      name: "ThoughtCares",
      type: "clinic",
      address: "42/43 Pekin Street, FarEast Square",
      postalCode: 49959,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.955419467871, 1.3214476908532],
        crs: crs
      },
      tags: [{ name: "emergency" }]
    },
    { include: [Tag] }
  ).then(res => res.addTags([tagHealthier]));

  await Health.create(
    {
      name: "Googlie",
      type: "clinic",
      address: "20 Cross Street",
      postalCode: 48422,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.894731355106, 1.31886941200841],
        crs: crs
      },
      tags: [{ name: "eldercare" }]
    },
    { include: [Tag] }
  ).then(async rest => {
    const [tag, created] = await Tag.findOrCreate({
      where: { name: "emergency" }
    });
    await rest.addTags([tag]);
    return rest;
  });
};

module.exports = createHealthOptions;
