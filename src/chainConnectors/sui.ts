import { SuiClient } from "@mysten/sui.js/client";

const client = new SuiClient({
    url: "https://fullnode.testnet.sui.io"
});

client.getObject({id: "0x2"})

export default client;