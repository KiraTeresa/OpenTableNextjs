import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    const {slug, day, time, partySize} = req.query as {slug: string, day: string, time: string, partySize: string}

    return res.json({slug, day, time, partySize: partySize})
}