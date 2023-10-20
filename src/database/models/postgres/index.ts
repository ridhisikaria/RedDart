import { Sequelize } from "sequelize";

const fs = require("fs")
const path = require("path")

const basename = path.basename(__filename)
const env = "development"
const configFile = require("../../config/postgres/index");
const config = configFile[env];
const db: any = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db["reddartDb"] = sequelize;

fs.readdirSync(__dirname)
    .filter((file: any) => file.indexOf(".") !== 0 && file !== basename && (file.slice(-3) === ".js" || file.slice(-3) === ".ts"))
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))(sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;

module.exports = db;