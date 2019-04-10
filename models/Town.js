module.exports = (sequelize, type) => {
  const Estate = sequelize.define(
    "estate",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      name: type.STRING,
      type: type.STRING,
      medRent: type.INTEGER,
      location: type.GEOMETRY("POLYGON")
    },
    { timestamps: false }
  );

  return Estate;
};
