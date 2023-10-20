import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { IUser } from "../types/user";
import client from "../chainConnectors/sui";

export class SuiTransfer {
    static async call(user: IUser) {
        const keypair = new Ed25519Keypair();
        // const keypair = "0x16d6608ffa4db9ec792019c55eae488224d72e1ae4e68eb578d87a08b6379f79";

        const tx = new TransactionBlock();
        const [coin] = tx.splitCoins(tx.gas, [1000]);
        tx.transferObjects([coin], "0x909e63e83c5da1dcf47b79782c0a477d8c742c28a88c4d65e3edc87c13653b23");
        const result = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
        });
        console.log(result);
    }
}