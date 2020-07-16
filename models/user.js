"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.todoList);
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      phone: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
