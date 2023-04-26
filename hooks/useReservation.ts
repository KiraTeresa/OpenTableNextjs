import {useState} from "react";
import axios from "axios";

export default function useReservation() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createReservation = async ({
                                         slug, partySize, day, time, bookerFirstName,
                                         bookerLastName,
                                         bookerPhone,
                                         bookerEmail,
                                         bookerOccasion,
                                         bookerRequest
                                     }: {
        slug: string;
        partySize: string;
        day: string;
        time: string;
        bookerFirstName: string;
        bookerLastName: string;
        bookerPhone: string;
        bookerEmail: string;
        bookerOccasion: string;
        bookerRequest: string
    }) => {
        setLoading(true)

        try {
            /*            const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`)*/

            const response = await axios.post(`http://localhost:3000/api/restaurant/${slug}/reserve`, {}, {
                params: {
                    day,
                    time,
                    partySize,
                    bookerFirstName,
                    bookerLastName,
                    bookerPhone,
                    bookerEmail,
                    bookerOccasion,
                    bookerRequest
                }
            })
            setLoading(false)
            return response.data
        } catch (error: any) {
            setLoading(false)
            setError(error.response.data.errorMessage)
        }
    }

    return {loading, error, createReservation}
}