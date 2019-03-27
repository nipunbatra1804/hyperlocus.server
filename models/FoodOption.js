module.exports = (sequelize, type) => {
  const FoodOption = sequelize.define(
    "foodoption",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      name: type.STRING,
      type: type.STRING,
      postalCode: type.INTEGER,
      address: type.STRING,
      openingTime: { type: type.TIME, allowNull: true },
      closingTime: { type: type.TIME, allowNull: true },
      location: type.GEOMETRY("POINT", 4326)
    },
    { timestamps: false }
  );

  FoodOption.associate = models => {
    FoodOption.belongsToMany(models.Tag, {
      through: "food_tag"
    });
  };
  return FoodOption;
};
