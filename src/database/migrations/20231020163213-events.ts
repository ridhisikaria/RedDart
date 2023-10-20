'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface: any, sequelize: any) => {
        return queryInterface.sequelize.transaction(async (t: any) => {
            await queryInterface.createTable("Events", {
                id: {
                    type: sequelize.UUID,
                    defaultValue: sequelize.UUIDV4,
                    primaryKey: true,
                    unique: true,
                    allowNull: false
                },
                txDigest: {
                    type: sequelize.STRING,
                    allowNull: false
                },
                eventSeq: {
                    type: sequelize.STRING,
                    allowNull: false
                },
                bcs: {
                    type: sequelize.STRING,
                    allowNull: false
                },
                packageId: {
                    type: sequelize.STRING,
                    allowNull: false
                },
                parsedJson: {
                    type: sequelize.JSON,
                    allowNull: false
                },
                sender: {
                    type: sequelize.STRING,
                    allowNull: false
                },
                timestamp: {
                    type: sequelize.STRING,
                    allowNull: true
                },
                transactionModule: {
                    type: sequelize.STRING,
                    allowNull: false
                },
                eventType: {
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
        return await queryInterface.dropTable("Events");
    }
};
