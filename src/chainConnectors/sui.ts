import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

const client = new SuiClient({
    url: getFullnodeUrl("devnet")
});

client.getObject({id: "0x2"});

export default client;