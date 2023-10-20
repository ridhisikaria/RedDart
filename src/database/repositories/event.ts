import { IEvent } from "../../types/event";

const models = require("../models");

export class EventRepository {
    static async create(event: IEvent): Promise<void> {
        try {
            await models.Events.create(event);
        } catch (error: any) {
            console.error("EventRepository error", { error });
            throw error;
        }
    }

    static async get(address: string): Promise<IEvent[]> {
        try {
            return await models.Events.findAll({
                where: { sender: address }
            });
        } catch (error: any) {
            console.error("EventRepository get", { address, error });
            throw error;
        }
    }
}