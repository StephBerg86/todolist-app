"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class todoItem extends Model {
    static associate(models) {
      todoItem.belongsTo(models.todoList);
      todoItem.belongsToMany(models.tag, {
        through: "itemTags",
        foreignKey: "todoItemId",
      });
    }
  }
  todoItem.init(
    {
      task: DataTypes.STRING,
      deadline: DataTypes.STRING,
      important: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "todoItem",
    }
  );
  return todoItem;
};
