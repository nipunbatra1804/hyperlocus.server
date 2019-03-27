module.exports = (sequelize, type) => {
  const Tag = sequelize.define(
    "tag",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: type.STRING }
    },
    { timestamps: false }
  );

  Tag.associate = models => {
    Tag.belongsToMany(models.FoodOption, {
      through: "food_tag",
      foreignKey: "foodid"
    });
    Tag.belongsToMany(models.Shop, {
      through: "shop_tag",
      foreignKey: "shopid"
    });
    Tag.belongsToMany(models.Health, {
      through: "health_tag",
      foreignKey: "healthid"
    });
  };
  return Tag;
};
