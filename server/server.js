import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import userRoute from './routes/useRoute.js';
import imageRouter from './routes/imageRoute.js';

dotenv.config();
await connectDB();

const app = express();
app.use(cors({
  origin: "https://imagifyc.onrender.com", // Replace with your deployed frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/image', imageRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
