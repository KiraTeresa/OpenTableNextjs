import Header from "@/app/search/components/Header";
import SearchSideBar from "@/app/search/components/SearchSideBar";
import RestaurantCard from "@/app/search/components/RestaurantCard";
import {PRICE, PrismaClient} from "@prisma/client";
import React from "react";
import {RestaurantCardType} from "@/app/page";

const prisma = new PrismaClient()
const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    slug: true,
    location: true,
    price: true,
    reviews: true,
}

interface SearchParams { city?: string, cuisine?: string, price?: PRICE }

const fetchRestaurantsByQuery = async (searchParams: SearchParams) => {

    const restaurants : RestaurantCardType[]= await prisma.restaurant.findMany({
        where: {
            location: {
                name: {
                    equals: searchParams.city?.toLowerCase()
                },
            },
            cuisine: {
                name: {
                    equals: searchParams.cuisine?.toLowerCase()
                },
            },
            price: {
                equals: searchParams.price
            }
        },
        select,
    })

    return restaurants
}

const fetchLocations = () => {
    return prisma.location.findMany()
}

const fetchCuisines = () => {
    return prisma.cuisine.findMany()
}

export default async function Search({searchParams}: { searchParams: SearchParams }) {
    const restaurants= await fetchRestaurantsByQuery(searchParams)
    const locations = await fetchLocations()
    const cuisines = await fetchCuisines()

    return (
        <>
            <Header/>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams}/>
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