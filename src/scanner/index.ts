import { SuiClient } from "@mysten/sui.js/client";
import { log } from 'console';
import { UserRepository } from "../database/repositories/user";
// connect to Devnet
// const provider = new JsonRpcProvider(devnetConnection);

// console.log(provider);

// export default provider;

const client = new SuiClient({
    url: "https://fullnode.devnet.sui.io"
});

client.getObject({ id: "0x2" });

const EVENT_TYPE = "0x0000000000000000000000000000000000000000000000000000000000000003::validator::StakingRequestEvent"

async function scanSui() {
    await client.subscribeEvent({
        filter: { MoveEventType: EVENT_TYPE },
        async onMessage(event) {
            const user = await UserRepository.get(event.sender);
            if (user) {
                console.log(user, event);
            }
        },
    });
}

export default scanSui;
