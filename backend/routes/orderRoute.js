import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

orderRouter.post("/verify", verifyOrder);

// here we are using the authMiddleware because it will
// convert the auth token into the userId

orderRouter.post("/userorders",authMiddleware, userOrders);

orderRouter.get("/list", listOrders);

orderRouter.post("/status", updateStatus);

export default orderRouter;