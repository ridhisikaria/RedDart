import { IUser } from "../../types/user";

const models = require("../models");

export class UserRepository {
    static async create(user: IUser): Promise<void> {
        try {
            await models.Users.create(user);
        } catch (error: any) {
            console.error("UserRepository error", { error });
            throw error;
        }
    }

    static async get(address: string): Promise<IUser> {
        try {
            return await models.Users.findAll({
                where: { address },
                limit: 1
            });
        } catch (error: any) {
            console.error("UserRepository get", { address, error });
            throw error;
        }
    }
}