import axios from "axios"
import {useContext} from "react";
import {AuthenticationContext} from "@/app/context/AuthContext";
import {any} from "prop-types";

const useAuth = () => {
    const {data, error, loading, setAuthState} = useContext(AuthenticationContext)

    const signin = async ({email, password}: {
        email: string; password: string
    }, handleClose: () => void) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin", {email, password})
            console.log(response)
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
            handleClose()
        } catch (error: any) {
            console.log(error.response.data.errorMessage)
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }
    const signup = async () => {
    }

    return {
        signin,
        signup
    }
}

export default useAuth