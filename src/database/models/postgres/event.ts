import { DataTypes, Model } from "sequelize";
import { SequelizeInstance } from "../../../types";

module.exports = (sequelize: SequelizeInstance) => {
    class Event extends Model {
    }

    Event.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
            txDigest: {
                type: DataTypes.STRING,
                allowNull: false
            },
            eventSeq: {
                type: DataTypes.STRING,
                allowNull: false
            },
            bcs: {
                type: DataTypes.STRING,
                allowNull: false
            },
            packageId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            parsedJson: {
                type: DataTypes.JSON,
                allowNull: false
            },
            sender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            timestamp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            transactionModule: {
                type: DataTypes.STRING,
                allowNull: false
            },
            eventType: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: "Events",
            timestamps: true
        }
    );

    return Event;
}