// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next'
import { EvmChain } from 'moralis/common-evm-utils';

export default async function handler(
    req: any,
    res: NextApiResponse
) {
    console.log(process.env.MORALIS_API_KEY)
    try {

        await Moralis.start({
            apiKey: process.env.MORALIS_API_KEY
        });

    } catch (e) {
        console.error(e);
    }
    const response = await Moralis.EvmApi.nft.getWalletNFTTransfers({
        "chain": EvmChain.POLYGON,

        "address": req.query.address
    });
    let result = await response.raw
    res.status(200).json({ address: req.query.address, result: result })


}
