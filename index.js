import express from 'express'
import { chatBot, usersRouter } from './Router/users.Routes.js';
export const app = express()
import cors from 'cors'


app.use(express.json())
app.use(cors(
    {
        origin:[
            'http://localhost:5173',
            'http://localhost:5174',
        ],
        methods:['GET','POST','PATCH','DELETE','GET','PUT'],
        credentials:true
    }
))


app.use('/auth',usersRouter)
app.use('/chat',chatBot)







