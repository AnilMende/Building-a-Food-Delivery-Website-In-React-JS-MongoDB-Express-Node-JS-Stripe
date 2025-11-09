import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoute.js';
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
    origin:"https://foodel-frontend-ui40.onrender.com",
    method:["GET", "POST", "PUSH", "PUT", "DELETE"],
    credentials:true
}));
// middleware
app.use(express.json());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req,res) => {
    res.send('CORS Fixed Successfully')
})

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
});
