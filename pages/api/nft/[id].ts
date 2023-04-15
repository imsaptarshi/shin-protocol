// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { quests } from '@/utils/helpers/quests'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let metadata = {}
    let id: any = Number(req.query.id)
    metadata = quests[id]
    if (metadata) {
        res.status(200).json(metadata)
    } else {
        res.status(400).json(metadata)
    }
}
