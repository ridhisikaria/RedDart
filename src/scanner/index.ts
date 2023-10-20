import { RuleMatcher } from "../ruleMatchingEngine";
import client from "../chainConnectors/sui";
// connect to Devnet
// const provider = new JsonRpcProvider(devnetConnection);

// console.log(provider);

// export default provider;

client.getObject({ id: "0x2" });

const EVENT_TYPE = "0x0000000000000000000000000000000000000000000000000000000000000003::validator::StakingRequestEvent"

async function scanSui() {
    await client.subscribeEvent({
        filter: { MoveEventType: EVENT_TYPE },
        async onMessage(event) {
            await RuleMatcher.call(event);
        },
    });
}

export default scanSui;
