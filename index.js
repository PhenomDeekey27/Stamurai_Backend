import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Authrouter } from './routes/userRoute.js';
import { TodoRouter } from './routes/todoRoute.js';
import cookieParser from 'cookie-parser';
import { NotificationRouter } from './routes/notiificationRoute.js';


dotenv.config();

// Initialize Clerk with your Clerk API keys


const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // or your frontend domain
  credentials: true, // allow cookies
}));

app.use(express.json());
app.use(cookieParser());




app.use("/api/auth", Authrouter);
app.use('/api/todo', TodoRouter);
app.use("/api/notifications",NotificationRouter );

try {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port', process.env.PORT);
    });
  });
} catch (error) {
  console.error('Error connecting to MongoDB or starting the server:', error);
}
