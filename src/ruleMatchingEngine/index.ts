import { SuiEvent } from "@mysten/sui.js/dist/cjs/client";
import { UserRepository } from "../database/repositories/user";
import { SuiTransfer } from "../actions/suiTransfer";
import { EventRepository } from "../database/repositories/event";

export class RuleMatcher {
    static async call(event: SuiEvent) {
        const user = await UserRepository.get(event.sender);
        if (user) {
            console.log(user, event);

            const eventObj = {
                bcs: event.bcs,
                txDigest: event.id.txDigest,
                eventSeq: event.id.eventSeq,
                packageId: event.packageId,
                parsedJson: event.parsedJson,
                sender: event.sender,
                timestamp: event.timestampMs,
                transactionModule: event.transactionModule,
                eventType: event.type,
                network: "SUI"
            };

            await EventRepository.create(eventObj);

            await SuiTransfer.call(user);
        }
    }
}