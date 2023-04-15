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

    var raw = JSON.stringify({
        "method": "qn_getWalletTokenBalance",
        "params": [{
            "wallet": req.query.address
        }],

        id: 67,
        "jsonrpc": "2.0"
    });

    var raw_2 = JSON.stringify({
        "method": "eth_getBalance",
        "params": [
            req.query.address,
            "latest"
        ],
        "id": 1,
        "jsonrpc": "2.0"
    });

    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var requestOptions_2: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw_2,
        redirect: 'follow'
    };

    let result: any = await fetch(process.env.QN_API || "", requestOptions)
    result = await result.json()
    let result_2: any = await fetch(process.env.QN_API || "", requestOptions_2)
    result_2 = await result_2.json()
    let bal_primary = eval(result_2.result) / (10 ** 18)
    let weightage_primary = (bal_primary / config.weightage.tokens.MATIC[1]) * config.weightage.tokens.MATIC[0]
    if (weightage_primary >= config.weightage.tokens.MATIC[0]) {
        weightage_primary = config.weightage.tokens.MATIC[0]
    }
    let bal = 0
    let weightage = 0
    try {
        for (let i = 0; i < result.result.result.length; i++) {
            let data = result.result.result[i]
            if (config.allowed_erc20_tokens.includes(data.symbol)) {
                let symbol = data.symbol
                if (!Object.keys(config.weightage.tokens).includes(symbol)) {
                    symbol = "OTHERS"
                }
                bal = (data.totalBalance / 10 ** data.decimals)
                let w = (bal / config.weightage.tokens[symbol][1]) * config.weightage.tokens[symbol][0]

                if (w >= config.weightage.tokens[symbol][0]) {
                    w = config.weightage.tokens[symbol][0]

                }
                weightage += w
            }
        }

    } finally {
        weightage += weightage_primary
        if (weightage >= config.weightage.balance) {
            weightage = config.weightage.balance
        }
        res.status(200).json({ result: weightage, address: req.query.address, })
    }
}
