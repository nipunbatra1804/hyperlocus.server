const { sequelize } = require("./models");
const createTowns = require("./tests/seed/seedTowns");
const app = require("./app");
const port = 8080;

sequelize.sync({ force: true }).then(() => {
  createTowns();
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
});
