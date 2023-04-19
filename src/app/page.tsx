import {Inter} from '@next/font/google'
import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
                <main>
                    <Header/>
                    {/* CARDS */}
                    <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                        <RestaurantCard/>
                    </div>
                    {/* CARDS */}
                </main>
    )
}
