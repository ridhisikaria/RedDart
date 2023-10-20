import { DataTypes, Model } from "sequelize";
import { SequelizeInstance } from "../../../types";

module.exports = (sequelize: SequelizeInstance) => {
    class User extends Model {
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Users",
            timestamps: true
        }
    );

    return User;
}