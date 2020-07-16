"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "itemTags",
      [
        {
          todoItemId: 1,
          tagId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          todoItemId: 3,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("itemTags", null, {});
  },
};
