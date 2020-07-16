"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class itemTags extends Model {
    static associate(models) {
      itemTags.belongsTo(models.tag);
      itemTags.belongsTo(models.todoItem);
    }
  }
  itemTags.init(
    {
      todoItemId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "itemTags",
    }
  );
  return itemTags;
};
