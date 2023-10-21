'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: any, sequelize: any) => {
    return await queryInterface.addColumn("Events", "network",
      {
        type: sequelize.STRING,
        allowNull: false
      }
    )
  },
  down: async (queryInterface: any, sequelize: any) => {
    return await queryInterface.removeColumn("Events", "network");
  }
};
