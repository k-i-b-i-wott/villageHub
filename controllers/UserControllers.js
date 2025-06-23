import {PrismaClient} from "@prisma/client"
import jwt from "jsonwebtoken"
const client = new PrismaClient()

import bcrypt from "bcrypt";
export const createUser = async(req,res)=>{
    const {firstName,lastName,emailAddress,userName,password,address,phoneNumber,profileImage} = req.body
    const hashedPassword = await bcrypt.hash(password,12)
    console.log(req.body)
    try {
        const user = await client.user.create({
        data:{
            firstName,
            lastName,
            emailAddress,
            userName,
            password:hashedPassword,        
            address,
            phoneNumber,
            profileImage,
        }
    })
    res.status(201).json({
        message:"User created successfully",
        data:user
    })

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
                message:"User not found"
            })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                message:"Incorrect password"
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
            profileImage:user.profileImage,
        }
        console.log(payLoad)
        const token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY,{})        
       
        res.status(200).cookie("token",token).json({
            message:"Login successful",
            data:user
        })
    } catch (error) {
        res.status(500).json({
            
            message:"Error logging in",
            data: error
        })
    }
}

export const UserProfile = async (req, res) => {
    const userId = req.user.userId;
    try {
        const userInfo = await client.user.findFirst({
            where: { userId },
            select: {
                userId: true,
                firstName: true,
                lastName: true,
                emailAddress: true,
                userName: true,
                address: true,
                phoneNumber: true,
                profileImage: true,
                createdAt: true,
                
            }
        });
        res.status(200).json({
            message: "User profile",
            data: userInfo
        });
    } catch (error) {
        res.json({
            message: "An error occurred",
            status: "Fail",
            data: error
        });
    }
}

