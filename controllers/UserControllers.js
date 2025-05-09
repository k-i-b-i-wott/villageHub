import {PrismaClient} from "@prisma/client"

const client = new PrismaClient()


import bcrypt from "bcrypt";
export const createUser = async(req,res)=>{
    const {firstName,lastName,emailAddress,userName,password,address,phoneNumber} = req.body
    const hashedPassword = await bcrypt.hash(password,12)
    console.log(req.body)
    try {
        const user = await client.user.create({
        data:{firstName,
            lastName,
            emailAddress,
            userName,
            password:hashedPassword,        
            address,
            phoneNumber
        }
    })
    res.json(user)

    } catch (error) {
        res.status(500).json({
            message:"Error creating user",
            error
        })
    }
}