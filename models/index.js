const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

if (env === "production") {
  sequelize = new Sequelize(config.url, config.options);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
  );
}

const models = {
  Town: sequelize.import("./Town.js"),
  Tag: sequelize.import("./Tag.js"),
  FoodOption: sequelize.import("./FoodOption.js"),
  Shop: sequelize.import("./Shop.js"),
  Health: sequelize.import("./Health.js")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
