import mongoose from "mongoose";
const env = process.env.NODE_ENV || "development";

export default class MongoDbConnectionManager{
    static dbInstance: mongoose.Connection;
    static async connectNoSqlDB(): Promise<void> {
        // await mongoose.connect()
        await mongoose.connect(process.env.MONGO_DB_URL!);
        this.dbInstance = mongoose.connection;

        this.dbInstance.on("connecting", () => console.info("MongoDB Connecting"));
        this.dbInstance.on("connected", () => console.info("MongoDB Connected"));
        this.dbInstance.on("disconnected", () => console.info("MongoDB Disconnected"));
        this.dbInstance.on("error", (error) => console.error("Error connecting MongoDB ", { error }));
    }

    static async getDbInstance(): Promise<mongoose.Connection> {
        if(!this.dbInstance) await this.connectNoSqlDB();
        return this.dbInstance;
    }
}