import jwt from "jsonwebtoken"

export  const verifyUser =(req,res,next)=>{
     const {token}= req.cookies

     jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json(
                {
                    message: "Please login",
                    status:"fail"
                }
            )
        }else {
            req.user = user
            next ()
        }


     })
}