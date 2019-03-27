module.exports = (sequelize, type) => {
  const Shop = sequelize.define(
    "shop",
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

  Shop.associate = models => {
    Shop.belongsToMany(models.Tag, {
      through: "shop_tag"
    });
  };
  return Shop;
};
