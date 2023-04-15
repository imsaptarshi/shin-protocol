// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.query)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "method": "eth_getTransactionCount",
        "params": [
            req.query.address,
            "latest"
        ],

        id: 1,
        "jsonrpc": "2.0"
    });

    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(process.env.QN_API || "", requestOptions)
        .then(response => response.json())
        .then((result: any) => res.status(200).json({ ...result, address: req.query.address, result: eval(result.result), }))
        .catch(e => res.status(400).json({ error: e }));
}
