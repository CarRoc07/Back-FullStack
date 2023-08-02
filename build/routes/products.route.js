"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const productsRouter = (0, express_1.Router)();
productsRouter.get("/products", productsController_1.getAllProducts);
productsRouter.post("/products", productsController_1.createProduct);
productsRouter.delete("/products/:id", productsController_1.deleteProduct);
exports.default = productsRouter;
