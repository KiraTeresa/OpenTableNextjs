import {Review} from "@prisma/client";
import {calculateReviewRatingAverage} from "../../../../../utils/calculateReviewRatingAverage";
import Stars from "@/app/components/Stars";

export default function Ratings({reviews}: {reviews: Review[]}){
    const rating = calculateReviewRatingAverage(reviews).toFixed(1)

    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <Stars reviews={reviews}/>
                <p className="text-reg ml-3">{rating}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Review{reviews.length === 1? "" : "s"}</p>
            </div>
        </div>
    )
}