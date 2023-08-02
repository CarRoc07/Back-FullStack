"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.updateOrder = exports.getAllOrders = void 0;
const db_1 = require("../db/db");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const orders = yield (0, db_1.prisma)().order.findMany({
            where: {
                userID: user.id
            }
        });
        if (!orders)
            return res.status(404).json({ message: "No orders found" });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllOrders = getAllOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const idOrder = Number(req.params.id);
        const newStatus = req.body.status;
        const order = yield (0, db_1.prisma)().order.update({
            where: {
                userID: user.id,
                id: idOrder
            },
            data: {
                status: newStatus
            }
        });
        res.status(200).json({ message: "Order updated" });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the order' });
    }
});
exports.updateOrder = updateOrder;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const user = res.locals.user;
        const orderItems = req.body.orderItems;
        const total = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        console.log(user, orderItems);
        const newOrder = yield (0, db_1.prisma)().order.create({
            data: {
                userID: user.id,
                status: "PENDING",
                total: total
            }
        });
        const orderID = newOrder.id;
        for (const item of orderItems) {
            yield (0, db_1.prisma)().orderItem.create({
                data: {
                    quantity: item.quantity,
                    productID: item.productID,
                    orderID: orderID,
                    price: item.price
                }
            });
        }
        res.status(201).json({ message: "Order created" });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the order' });
    }
});
exports.createOrder = createOrder;
