import { SuiEvent } from "@mysten/sui.js/dist/cjs/client";
import { UserRepository } from "../database/repositories/user";
import { SuiTransfer } from "../actions/suiTransfer";

export class RuleMatcher {
    static async call(event: SuiEvent) {
        const user = await UserRepository.get(event.sender);
        if (user) {
            console.log(user, event);

            await SuiTransfer.call(user);
        }
    }
}