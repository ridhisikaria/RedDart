import { RuleMatcher } from "../ruleMatchingEngine";
import client from "../chainConnectors/sui";

const EVENT_TYPE = "0x0000000000000000000000000000000000000000000000000000000000000003::validator::StakingRequestEvent"

async function scanSui() {
    try {
        await client.subscribeEvent({
            filter: { MoveEventType: EVENT_TYPE },
            async onMessage(event) {
                await RuleMatcher.call(event);
            },
        });
    } catch(error: any) {
        console.error("Failed to subscribe sui events");
        await scanSui();
    }
}

export default scanSui;
