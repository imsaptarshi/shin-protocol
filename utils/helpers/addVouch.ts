import { ethers, Wallet } from "ethers";
import config from "./config";
import * as PushAPI from "@pushprotocol/restapi";

declare let window: any;
export default async function addVouch(sender: string, receiver: string) {
    //console.log("uploading", file)
    if (typeof window !== "undefined") {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                config.vouchingContract.address,
                config.vouchingContract.abi,
                signer
            );
            //console.log(contract)
            try {

                const transaction = await contract.addVouch(receiver);
                await transaction.wait();
                const PK = process.env.NEXT_PUBLIC_PRIVATE_KEY; // channel private key
                const Pkey = `0x${PK}`;
                const _signer: any = await new Wallet(Pkey);
                const apiResponse = await PushAPI.payloads.sendNotification({
                    signer: _signer,
                    type: 3,
                    identityType: 2,
                    notification: {
                        title: `You are vouched for!`,
                        body: sender.slice(0, 4) + "..." + " vouched for you"
                    },
                    payload: {
                        title: `You are vouched for!`,
                        body: sender.slice(0, 4) + "..." + " vouched for you",
                        cta: sender.slice(0, 4) + "..." + " vouched for " + receiver.slice(0, 4) + "...",
                        img: '/assets/icons/award.svg'
                    },
                    recipients: 'eip155:80001:' + receiver,
                    channel: 'eip155:80001:0xeA88B7ad2B6663A4FC367bB1289D6EeD7a34860C',
                    env: "staging"
                });
                await PushAPI.payloads.sendNotification({
                    signer: signer,
                    type: 3,
                    identityType: 2,
                    notification: {
                        title: `Vouched successfully!`,
                        body: "You vouched for " + receiver.slice(0, 4) + "..."
                    },
                    payload: {
                        title: `Vouched successfully!`,
                        body: "You vouched for " + receiver.slice(0, 4) + "...",
                        cta: sender.slice(0, 4) + "..." + " vouched for " + receiver.slice(0, 4) + "...",
                        img: '/assets/icons/completed.svg'
                    },
                    recipients: 'eip155:80001:' + sender,
                    channel: 'eip155:80001:0xeA88B7ad2B6663A4FC367bB1289D6EeD7a34860C',
                    env: "staging",

                });


                return transaction;
            } catch (err) {
                //console.log(err);
                return err;
            }
        }
    }
}