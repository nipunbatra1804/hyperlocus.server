module.exports = (sequelize, type) => {
  const Town = sequelize.define(
    "town",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      name: type.STRING,
      type: type.STRING,
      medRent: type.INTEGER,
      location: type.GEOMETRY("POINT")
    },
    { timestamps: false }
  );

  return Town;
};
