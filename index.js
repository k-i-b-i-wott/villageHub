import express from 'express'
import { usersRouter } from './Router/users.Routes.js';
export const app = express()


app.use(express.json())

app.use('/auth',usersRouter)








