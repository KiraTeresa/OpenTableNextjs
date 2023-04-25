import RestaurantNavBar from "@/app/restaurant/[slug]/components/RestaurantNavBar";
import Title from "@/app/restaurant/[slug]/components/Title";
import Ratings from "@/app/restaurant/[slug]/components/Ratings";
import Description from "@/app/restaurant/[slug]/components/Description";
import Images from "@/app/restaurant/[slug]/components/Images";
import Reviews from "@/app/restaurant/[slug]/components/Reviews";
import ReservationCard from "@/app/restaurant/[slug]/components/ReservationCard";
import {PrismaClient, Review} from "@prisma/client";
import {notFound} from "next/navigation";

const prisma = new PrismaClient();

interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    reviews: Review[];
    open_time: string;
    close_time: string
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true,
            open_time: true,
            close_time: true
        }
    })

    if(!restaurant){
        notFound()
    }

    return restaurant
}

export default async function RestaurantDetails({params}: { params: { slug: string } }) {

    const restaurant = await fetchRestaurantBySlug(params.slug)
    const {name, description, images, slug, reviews, close_time, open_time} = restaurant

    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar slug={slug}/>
                <Title name={name}/>
                <Ratings reviews={reviews}/>
                <Description description={description}/>
                <Images images={images}/>
                <Reviews reviews={reviews}/>
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard openTime={open_time} closeTime={close_time}/>
            </div>
        </>
    )
}