import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui.js/faucet";
import { IUser } from "../types/user";
//import client from "../chainConnectors/sui";

const rpcUrl = getFullnodeUrl("devnet");
const client = new SuiClient({ url: rpcUrl });

//let seed = "tomorrow income burger sauce relief enact wide afraid become approve air rib";
let keypair = new Ed25519Keypair();
//let keypair = Ed25519Keypair.deriveKeypairFromSeed("surge retire stage scissors move forum crucial carry best normal evil adjust");
console.log(keypair.getPublicKey().toSuiAddress());

requestSuiFromFaucetV0({
    host: getFaucetHost('devnet'),
    recipient: keypair.getPublicKey().toSuiAddress()
})

export class SuiTransfer {
    static async call(user: IUser) {
        try {
            const tx = new TransactionBlock();
            const [coin] = tx.splitCoins(tx.gas, [10000]);
            console.log([coin])

            tx.transferObjects([coin], user.address);
            tx.setGasBudget(100000000);
            const result = await client.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                signer: keypair,
                requestType: 'WaitForLocalExecution',
                options: {
                    showEffects: true,
                }
            });
        } catch (error) {
            console.log("PROBLEM", error);
        }
    }
}