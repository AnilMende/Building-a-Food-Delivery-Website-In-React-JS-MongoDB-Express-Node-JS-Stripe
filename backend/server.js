import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';

import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

app.use(cors({
    origin : "*",
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true,
    optionsSuccessStatus : 200
}))


// db connection
await connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.get("/api/status", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
});
