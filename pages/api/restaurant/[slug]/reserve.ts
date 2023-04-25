import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {slug, day, time, partySize} = req.query as {slug: string, day: string, time: string, partySize: string}

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        }
    })

    if (!restaurant) {
        return res.status(400).json({errorMessage: "Restaurant not found"})
    }

    if(new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) || new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)){
        return res.status(400).json({errorMessage: "Restaurant is not open at that time"})
    }

    return res.json({slug, day, time, partySize: partySize})
}