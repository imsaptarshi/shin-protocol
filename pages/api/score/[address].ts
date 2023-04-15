// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import config from '@/utils/helpers/config'
import { questIds, quests } from '@/utils/helpers/quests'
import { supabase } from '@/utils/helpers/supabase'
import { trackIds, tracks } from '@/utils/helpers/tracks'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let _configW = config.weightage;
    try {

        if (req.body?.config) {
            config.weightage = { ...config.weightage, ...req.body.config, tokens: { ...config.weightage.tokens, ...req.body.config?.tokens }, chain_history: { ...config.weightage.chain_history, ...req.body.config?.chain_history } }
        }

        let address = req.query.address
        //chain_history
        let erc20_token_transactions: any = await axios.get(process.env.NEXT_APP_HOST + "api/erc20_token_transactions/" + address)
        erc20_token_transactions = erc20_token_transactions.data.result

        let transaction_count: any = await axios.get(process.env.NEXT_APP_HOST + "api/transaction_count/" + address)
        transaction_count = transaction_count.data.result

        //balance
        let balance: any = await axios.get(process.env.NEXT_APP_HOST + "api/balance/" + address)
        balance = balance.data.result

        //nft_count
        let nft_count: any = await axios.get(process.env.NEXT_APP_HOST + "api/nft_count/" + address)
        nft_count = nft_count.data.result

        //weightage calc
        erc20_token_transactions = (erc20_token_transactions / config.weightage.chain_history.erc20_token_transactions[1]) * config.weightage.chain_history.erc20_token_transactions[0]
        if (erc20_token_transactions >= config.weightage.chain_history.erc20_token_transactions[0]) {
            erc20_token_transactions = config.weightage.chain_history.erc20_token_transactions[0]
        }

        transaction_count = (transaction_count / config.weightage.chain_history.transaction_count[1]) * config.weightage.chain_history.transaction_count[0]
        if (transaction_count >= config.weightage.chain_history.transaction_count[0]) {
            transaction_count = config.weightage.chain_history.transaction_count[0]
        }

        nft_count = (nft_count / config.weightage.NFT_count[1]) * config.weightage.NFT_count[0]
        if (nft_count >= config.weightage.NFT_count[0]) {
            nft_count = config.weightage.NFT_count[0]
        }
        let { data } = await supabase.from("user").select("tracks").match({ address: address }).single()
        let track_score = 0
        for (let i = 0; i < trackIds.length; i++) {

            if (data?.tracks?.includes(trackIds[i])) {
                track_score += tracks[trackIds[i]].weightage
            }
        }

        let quest_score = 0
        if (!req.body?.ignoreQuests) {
            let { data } = await supabase.from("user").select("quests").match({ address: address }).single()
            for (let i = 0; i < questIds.length; i++) {

                if (data?.quests?.includes(questIds[i])) {
                    quest_score += quests[questIds[i]].points
                }
            }
        }

        let result = balance + nft_count + erc20_token_transactions + transaction_count + track_score + quest_score

        if (result >= 100) {
            result = 100
        }
        config.weightage = _configW
        res.status(200).json({ result: result / 100, address: address })

    } catch (e) {
        config.weightage = _configW
        res.status(400).json({ error: e })

    } finally {
        config.weightage = _configW
    }
}
