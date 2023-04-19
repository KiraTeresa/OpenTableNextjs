import {Inter} from '@next/font/google'
import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
import {PrismaClient} from "@prisma/client";

/** This is a server component
 *  No http requests, fetching data directly from the server
 */

const inter = Inter({subsets: ['latin']})
const prisma = new PrismaClient()

const fetchRestaurants = async () => {
    const restaurants = await prisma.restaurant.findMany();
    return restaurants
}

export default async function Home() {
    const restaurants = await fetchRestaurants()
    console.log({restaurants})

    return (
                <main>
                    <Header/>
                    <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                        <RestaurantCard/>
                    </div>
                </main>
    )
}
