const { Tag } = require("../models/index");
const addTagsToModel = async (model, tagNames) => {
  await tagNames.forEach(async name => {
    let [tag, created] = await Tag.findOrCreate({ where: { name: name } });
    await model.addTag([tag]);
  });
  return model;
};

module.exports = addTagsToModel;
