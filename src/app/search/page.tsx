import Header from "@/app/search/components/Header";
import SearchSideBar from "@/app/search/components/SearchSideBar";
import RestaurantCard from "@/app/search/components/RestaurantCard";
import {RestaurantCardType} from "@/app/page";
import {PrismaClient} from "@prisma/client";
import {useSearchParams} from "next/navigation";

const prisma = new PrismaClient()
const fetchRestaurantsByCity = (city: string | undefined): Promise<RestaurantCardType[]> => {
    const select = {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        slug: true,
        location: true,
        price: true
    }
    if (!city) {
        return prisma.restaurant.findMany({select})
    }

    return prisma.restaurant.findMany({
        where: {
            location: {
                name: {
                    equals: city.toLowerCase()
                },
            },
        },
        select,
    });
}

export default async function Search({searchParams}: { searchParams: { city: string } }) {
    const restaurants = await fetchRestaurantsByCity(searchParams.city)

    return (
        <>
            <Header/>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar
                />
                <div className="w-5/6">
                    {restaurants.length ?
                        (
                            <>
                                {restaurants.map(restaurant => {
                                    return <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                                })}
                            </>
                        )
                        : <p>Sorry, we found no restaurants in this area.</p>}
                </div>
            </div>
        </>
    )
}