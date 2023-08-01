import { Router } from "express";
import { createOrder, getAllOrders, updateOrder } from "../controllers/orderController";
import { verifyToken } from "../controllers/authController";

const ordersRouter = Router();

ordersRouter.get('/orders',verifyToken, getAllOrders)
ordersRouter.post('/orders',verifyToken, createOrder)
ordersRouter.put('/orders/:id', verifyToken, updateOrder)

export default ordersRouter;