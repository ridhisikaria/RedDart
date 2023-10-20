import { SuiClient } from "@mysten/sui.js/client";

const client = new SuiClient({
    url: "https://fullnode.devnet.sui.io"
});

export default client;