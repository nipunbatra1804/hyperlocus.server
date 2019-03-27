const { Town } = require("../../models");

const createTowns = async () => {
  await Town.create({ name: "ANG MOH KIO", type: "1-RM", medRent: 1700 });
  await Town.create({ name: "CLEMENTI", type: "1-RM", medRent: 1900 });
  await Town.create({ name: "BUONA VISTA", type: "1-RM", medRent: 2700 });
};

module.exports = createTowns;
