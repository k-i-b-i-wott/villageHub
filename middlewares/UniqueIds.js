import {PrismaClient} from "@prisma/client"

const client = new PrismaClient()

export const CheckEmailPassword =  async (req, res, next) => {
    const { emailAddress, userName,phoneNumber } = req.body;
    try {
        
        const existingEmail= await client.user.findFirst({
            where: {
                emailAddress,               
            }           
        })
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const existingPhoneNumber= await client.user.findFirst({
            where: {
                phoneNumber,               
            }           
        })
        if (existingPhoneNumber) {
            return res.status(400).json({
                message: "Phone number already exists",
            });
        }
        const existingUserName= await client.user.findFirst({
            where: {
                userName,               
            }           
        })
        if (existingUserName) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }


    } catch (error) {
        res.status(500).json({
            message:"an error occurred",            
        })        
    }
   
    next();
}