import { ethers } from "ethers";
import { UserRepository } from "../database/repositories/user";
import { readFileSync } from "fs";
import appRoot from "app-root-path"

const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";

const LAST_SYNCED_BLOCK = 26972593;
const PRIVATE_KEY = "15b4f5065679a548b96348edf05523585b8e3c7abc6101f6f3abc387bf99e110";
const PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URL);
const SIGNER = new ethers.Wallet(PRIVATE_KEY, PROVIDER);
const CONTRACT_ADDRESS = "0x120eeA166a608Bf3b6002CDF60B8F5E869746D01";
const CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, getABI(), PROVIDER);
const METHOD_NAME = "transferToken"

export class Poller {
  static async pollBlocks(lastSyncedBlock: number) {
    let processBlock = lastSyncedBlock + 1;
    try {
      const currentBlock = await PROVIDER.getBlockNumber();
      const gasPrice = (await PROVIDER.getFeeData()).gasPrice
      
      if(!gasPrice) throw "Gas Price not found"

      while (processBlock <= currentBlock) {
        const block = await PROVIDER.getBlockWithTransactions(lastSyncedBlock)
        if(block) {
          console.log(block.hash);
          console.log(block.number);
            const userAddresses = await Poller.filterLogs(block.transactions, gasPrice);
            if(userAddresses.length) await Poller.transactionFound(userAddresses, gasPrice);
        }
      }
      setTimeout(() => Poller.pollBlocks(processBlock), 1000);
    } catch (e) {
      console.error("Error in polling", e);
      setTimeout(() => Poller.pollBlocks(processBlock - 1), 1000);
    }
  }

  static async filterLogs(txns: ethers.providers.TransactionResponse[], gasPrice: ethers.BigNumberish): Promise<string[]> {
    
    const userAddresses = [];
    for (const index in txns) {
      const txn = txns[index];
      console.log("TranasctionHash " + txn.hash);
      const isUser = await Poller.isUserAddress(txn.from);
      if (isUser) {
        userAddresses.push(txn.from)
      }
    }
    return userAddresses;
  }

  static async isUserAddress(address: string): Promise<boolean> {
    const user = await UserRepository.get(address);
    if (user){
        return true
    }
    return false;
  }

  static async transactionFound(
    users: string[],
    gasPrice: ethers.BigNumberish
  ) {
    console.log("TRANSACTION FOUND", { users });
    const amounts = users.map(user=>ethers.utils.parseEther("0.0005"))
    const data=CONTRACT.interface.encodeFunctionData(METHOD_NAME,[users,amounts] );
    // const data=CONTRACT.estimateGas(METHOD_NAME)([users,amounts] );

    const tx = await SIGNER.sendTransaction({
        to: CONTRACT_ADDRESS,
        gasPrice,
        data
    })
    console.log("TRANSACTION sent", tx.hash)
    await PROVIDER.waitForTransaction(tx.hash);
  }

}
function getABI() : string {
  return JSON.parse(readFileSync(`${appRoot}/src/scanner/ABI.json`, "utf-8"))

}

Poller.pollBlocks(LAST_SYNCED_BLOCK);