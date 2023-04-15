// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next'
import { EvmChain } from 'moralis/common-evm-utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var raw = `secret=${process.env.RECAPTCHA_SECRET}&response=${req.body['response']}`;

    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let response: any = await fetch("https://www.google.com/recaptcha/api/siteverify", requestOptions)
    response = await response.json()
    res.status(200).json({ response })
}
