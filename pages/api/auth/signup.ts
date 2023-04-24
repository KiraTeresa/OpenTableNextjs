import {NextApiRequest, NextApiResponse} from "next"
import validator from "validator"
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt"
import * as jose from "jose"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST"){
        const {firstName, lastName, email, city, phone, password} = req.body
        const errors: string[] = []

        const validationSchema = [{
            valid: validator.isLength(firstName,{
                min: 1,
                max: 20,
            }),
            errorMessage: "First name is invalid"
        },
            {
                valid: validator.isLength(lastName,{
                    min: 1,
                    max: 30,
                }),
                errorMessage: "Last name is invalid"
            },
            {
                valid: validator.isEmail(email),
                errorMessage: "Email is invalid"
            },
            {
                valid: validator.isMobilePhone(phone),
                errorMessage: "Phone number is invalid"
            },
            {
                valid: validator.isLength(city,{min: 1}),
                errorMessage: "City is Invalid"
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: "Password is too weak"
            }
        ]

        validationSchema.forEach(check => {
            if(!check.valid){
                errors.push(check.errorMessage)
            }
        })

        if(errors.length){
            return res.status(400).json({errorMessage: errors[0]})
        }

        const userWithEmail = await prisma.user.findUnique({
            where: { email}
        })

        if (userWithEmail){
            return res.status(400).json({errorMessage: "Email is associated with another account."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({data: {
            first_name: firstName,
                last_name: lastName,
                password: hashedPassword,
                city,
                phone,
                email
            }})

        const alg = "HS256"

        const secret = new TextEncoder().encode(process.env.JWT_SECTRET)

        /*
        * Create a new JWT:
        * pass in the payload (unique identifier)
        * set the header/algorithm
        * expiration time
        * the secret
        */
        const token = await new jose.SignJWT({email: user.email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret)

        res.status(200).json({token: token})
    }

    return res.status(404).json("Unknown endpoint")
}