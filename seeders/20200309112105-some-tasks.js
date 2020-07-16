"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "Finish Reports",
          todoListId: 1,
          important: false,
          deadline: "20/3/2020",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Plan Birthday",
          todoListId: 2,
          important: true,
          deadline: "20/3/2020",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Go swimming",
          todoListId: 2,
          important: false,
          deadline: "20/3/2020",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Practice freekicks",
          todoListId: 3,
          important: false,
          deadline: "20/3/2020",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Score 60+ goals",
          todoListId: 3,
          important: true,
          deadline: "20/3/2020",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("todoItems", null, {});
  },
};
