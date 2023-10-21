import { SuiTransfer } from "../actions";
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

    static async trigger(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
        try {
            console.log("EventTrigger called");
            const query = req.query;

            const eventObject = {
                bcs: "bcs",
                txDigest: "sampleDigest",
                eventSeq: "0",
                packageId:"0",
                parsedJson: "0",
                sender: query.address as string,
                timestamp: (new Date()).getTime().toString(),
                transactionModule: "0",
                eventType: "0",
                network: "SUI"
            }

            await EventRepository.create(eventObject);

            await SuiTransfer.call({ address: query.address as string, network: "SUI" });
            return res.json(200).json({ success: true });
        } catch (error: any) {
            console.error("Event trigger api failed", { error });
            return res.status(500).json({ success: false, error: { message: "Internal Server Error" } });
        }
    }
}