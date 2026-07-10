import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";

const app = express();
const port = process.env.PORT 
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/auth", authRouter);
app.use('/post', postRouter);

app.get('/', (req, res) => {
  res.send('welcome to social media web app')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
