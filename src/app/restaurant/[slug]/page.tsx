import Header from "@/app/restaurant/[slug]/components/Header";
import RestaurantNavBar from "@/app/restaurant/[slug]/components/RestaurantNavBar";
import Title from "@/app/restaurant/[slug]/components/Title";
import Ratings from "@/app/restaurant/[slug]/components/Ratings";
import Description from "@/app/restaurant/[slug]/components/Description";
import Images from "@/app/restaurant/[slug]/components/Images";
import Reviews from "@/app/restaurant/[slug]/components/Reviews";
import ReservationCard from "@/app/restaurant/[slug]/components/ReservationCard";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
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
            slug: true
        }
    })

    if(!restaurant){
        throw new Error();
    }

    return restaurant
}

export default async function RestaurantDetails({params}: { params: { slug: string } }) {

    const restaurant = await fetchRestaurantBySlug(params.slug)
    const {name, description, images, slug} = restaurant

    console.log(restaurant)

    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar slug={slug}/>
                <Title name={name}/>
                <Ratings/>
                <Description description={description}/>
                <Images images={images}/>
                <Reviews/>
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard/>
            </div>
        </>
    )
}