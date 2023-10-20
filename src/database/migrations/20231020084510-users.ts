'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: any, sequelize: any) => {
    return queryInterface.sequelize.transaction(async (t: any) => {
      await queryInterface.createTable("Users", {
        id: {
          type: sequelize.UUID,
          defaultValue: sequelize.UUIDV4,
          primaryKey: true,
          unique: true,
          allowNull: false
        },
        address: {
          type: sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: sequelize.DATE,
          allowNull: false
        },
      });
    });
  },
  down: async (queryInterface: any, sequelize: any) => {
    return await queryInterface.dropTable("Users");
  }
};
