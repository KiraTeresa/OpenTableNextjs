import {Inter} from '@next/font/google'
import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
import {PrismaClient, Cuisine, Location, PRICE, Review} from "@prisma/client";

/** This is a server component
 *  No http requests, fetching data directly from the server
 */

export interface RestaurantCardType {
    id: number;
    name: string;
    main_image: string;
    cuisine: Cuisine;
    slug: string;
    location: Location;
    price: PRICE;
    reviews: Review[];
}

const inter = Inter({subsets: ['latin']})
const prisma = new PrismaClient()

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
    const restaurants = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            main_image: true,
            cuisine: true,
            slug: true,
            location: true,
            price: true,
            reviews: true,
        }
    });
    return restaurants
}

export default async function Home() {
    const restaurants = await fetchRestaurants()

    return (
                <main>
                    <Header/>
                    <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                        {restaurants.map((restaurant) => {
                            return <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                        })}
                    </div>
                </main>
    )
}
