import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import { Authrouter } from './routes/userRoute.js'
import { TodoRouter } from './routes/todoRoute.js'
import cookieParser from 'cookie-parser'



dotenv.config()

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL, // or your frontend domain
    credentials: true, // allow cookies
  }));
app.use(express.json())
app.use(cookieParser());



app.use("/api/auth",Authrouter)

app.use('/api/todo',TodoRouter)




try {
    mongoose.connect(process.env.MONGO_URI).then(
        ()=>{
            app.listen(process.env.PORT,()=>{
                console.log('server is running on ',process.env.PORT)
            })
        }
    )
    
} catch (error) {
    console.log(error)
    
}

