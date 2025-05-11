import {PrismaClient} from "@prisma/client"

import jwt from "jsonwebtoken"
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

export const loginUser = async (req,res)=>{
    const {identifier,password} = req.body
    try {
        const user = await client.user.findFirst({
            where:{
                OR:[
                    {emailAddress:identifier},
                    {userName:identifier}
                ]
            }
        })
        if(!user){
            return res.status(404).json({
                message:"Ivalid credentials"
            })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        const payLoad ={
            userId:user.userId,
            userName:user.userName,
            firstName:user.firstName,
            lastName:user.lastName,
            emailAddress:user.emailAddress,
            phoneNumber:user.phoneNumber,
            address:user.address,

        }
        const token = jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn:"1d"})
       
        res.status(200).json({
            message:"Login successful",
            token
        })
    } catch (error) {
        res.status(500).json({
            message:"Error logging in",
            error
        })
    }
}