import { Request, Response } from "express"
import { prisma } from "../db/db"
import { Decoded, OrderItemInput } from "../types/utils"

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const user: Decoded = res.locals.user
        const orders =  await prisma().order.findMany({
            where: {
                userID: user.id
            }
        })
        if(!orders) return res.status(404).json({message: "No orders found"})

        res.json(orders)
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const user: Decoded = res.locals.user
        const idOrder = Number(req.params.id)
        const newStatus = req.body.status

        const order = await prisma().order.update({
            where: {
                userID: user.id,
                id: idOrder
            },
            data: {
                status: newStatus
            }
        })

        res.status(200).json({message: "Order updated"})
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the order' });
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const user: Decoded = res.locals.user
        const orderItems: OrderItemInput[] = req.body.orderItems;
        const total = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
        console.log(user, orderItems)

        const newOrder = await prisma().order.create({
            data: {
                userID: user.id,
                status: "PENDING",
                total: total
            }
        })

        const orderID = newOrder.id

        for (const item of orderItems) {
            await prisma().orderItem.create({
                data: {
                    quantity: item.quantity,
                    productID: item.productID,
                    orderID: orderID,
                    price: item.price
                }
            });
        }

        res.status(201).json({message: "Order created"})
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the order' });
    }
} 