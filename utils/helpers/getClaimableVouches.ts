import { ethers } from "ethers";
import config from "./config";

declare let window: any;
export default async function getClaimableVouches(address: string) {
    if (typeof window !== "undefined") {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                config.vouchingContract.address,
                config.vouchingContract.abi,
                signer
            );
            try {
                const data = await contract.getClaimableVouches(address);
                //console.log(data)

                return data;
            } catch (err) {
                //console.log(err)
            }
        }
    }
}