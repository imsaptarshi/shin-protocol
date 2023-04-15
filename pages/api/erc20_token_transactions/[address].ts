// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import config from '@/utils/helpers/config';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.query)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let count = 0
    try {
        for (let i = 0; i < config.allowed_erc20_token_contracts.length; i++) {
            var raw = JSON.stringify({
                "id": 67,
                "jsonrpc": "2.0",
                "method": "qn_getWalletTokenTransactions",
                "params": [{
                    "address": req.query.address,
                    "contract": config.allowed_erc20_token_contracts[i],

                }]
            });

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let response: any = await fetch(process.env.QN_API || "", requestOptions)
            response = await response.json()
            count += response.result.totalItems

        }
        return
    } catch (e) {
        res.status(400).json({ error: e })
    } finally {
        res.status(200).json({ result: count, address: req.query.address })
    }
}
