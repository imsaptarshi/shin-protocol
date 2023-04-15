import { Wallet, ethers } from "ethers";
import config from "./config";
import { quests } from "./quests";
import * as PushAPI from "@pushprotocol/restapi";

declare let window: any;
export default async function safeMint(id: number, address: string,) {
    if (typeof window !== "undefined") {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                config.NFTContract.address,
                config.NFTContract.abi,
                signer
            );
            console.log(contract)
            try {

                const transaction = await contract.safeMint(address, quests[id].ipfsHash);
                await transaction.wait();
                const PK = process.env.NEXT_PUBLIC_PRIVATE_KEY; // channel private key
                const Pkey = `0x${PK}`;
                const _signer: any = await new Wallet(Pkey);
                const apiResponse = await PushAPI.payloads.sendNotification({
                    signer: _signer,
                    type: 3,
                    identityType: 2,
                    notification: {
                        title: `You received an NFT!`,
                        body: "NFT received for " + quests[id].name
                    },
                    payload: {
                        title: `You received an NFT!`,
                        body: "NFT received for " + quests[id].name,
                        cta: "",
                        img: '/assets/icons/award.svg'
                    },
                    recipients: 'eip155:80001:' + address,
                    channel: 'eip155:80001:0xeA88B7ad2B6663A4FC367bB1289D6EeD7a34860C',
                    env: "staging"
                });

                return transaction;
            } catch (err) {
                //console.log(err);
                return err;
            }
        }
    }
}