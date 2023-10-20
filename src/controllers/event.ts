import { EventRepository } from "../database/repositories/event";
import { ExpressRequest, ExpressResponse } from "../types";

export class EventController {
    static async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
        try {
            const query = req.params;

            const address = query.address as string;
            if (!address) {
                return res.status(400).json({ success: false, error: { message: "Validation Failed" } });
            }

            const events = await EventRepository.get(address);
            return res.status(200).json({ success: true, data: events });
        } catch (error: any) {
            console.error("Event get api failed", { error });
            return res.status(500).json({ success: false, error: { message: "Internal Server Error" } });
        }
    }
}