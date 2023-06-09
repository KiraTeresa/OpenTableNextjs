import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";
import {findAvailableTables} from "../../../../services/restaurant/findAvailableTables";

const prisma = new PrismaClient()

/*
* Check, if day time and partySize are provided
* Get the searchTimes by looking up the provided time in the times data
* Check, if there are searchTimes
* Search the db for all bookings, where the booking_time is equal to one of the searchTimes we just got; get that bookings number_of_people, booking_time and tables
* For each of the bookings store the booking_time and all booked tables in an object
* Find the restaurant (given via slug) in db and return its tables
* Check, if there is such restaurant
* For each searchTime return an object, which holds the provided date, the time, and the restaurants tables, and store these object in an array
* Take the booked tables and remove those from that newly created array
* For every searchTime get the sum of available seats and compare to requested partySize
* Filter times only, which are within restaurant opening window
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if(req.method === "GET"){
       const {slug, day, time, partySize} = req.query as {
           slug: string;
           day: string;
           time: string;
           partySize: string
       }

       if (!day || !time || !partySize) {
           return res.status(400).json({errorMessage: "Invalid data provided"})
       }

       const restaurant = await prisma.restaurant.findUnique({
           where: {
               slug
           },
           select: {
               tables: true,
               open_time: true,
               close_time: true,
           }
       })

       if (!restaurant) {
           return res.status(400).json({errorMessage: "Invalid data provided"})
       }

       const searchTimesWithTables = await findAvailableTables({day, time, res, restaurant})

       if(!searchTimesWithTables){
           return res.status(400).json({errorMessage: "Invalid data provided"})
       }

       const availabilities = searchTimesWithTables.map(t => {
           const sumSeats = t.tables.reduce((sum, table) => {
               return sum + table.seats
           }, 0)

           return {
               time: t.time,
               available: sumSeats >= parseInt(partySize)
           }
       }).filter(availability => {
           const timeIsAfterOpeningHours = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`)

           const timeIsBeforeClosingHours = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant.close_time}`)

           return timeIsAfterOpeningHours && timeIsBeforeClosingHours
       })

       return res.json(availabilities)
   }
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-01-01&time=20:00:00.000Z&partySize=4