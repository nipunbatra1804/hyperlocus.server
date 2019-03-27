module.exports = (sequelize, type) => {
  const Health = sequelize.define(
    "health",
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
  Health.associate = models => {
    Health.belongsToMany(models.Tag, {
      through: "health_tag"
    });
  };
  return Health;
};
