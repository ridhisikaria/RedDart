import { RuleMatcher } from "../ruleMatchingEngine";
import client from "../chainConnectors/sui";

const EVENT_TYPE = "0x0000000000000000000000000000000000000000000000000000000000000003::validator::StakingRequestEvent";

const scanSui = async  () => {
    try {
    await client.subscribeEvent({
            filter: { MoveEventType: EVENT_TYPE },
            onMessage(event) {
                RuleMatcher.call(event).then(() => {
                    console.log("Sui Event processing success")
                }).catch((error: any) => {
                    console.log("Event processing failed");
                })
            },
        });
    } catch(error: any) {
        console.error("Failed to subscribe sui events", error);
        // await scanSui();
    }
}

export default scanSui;
