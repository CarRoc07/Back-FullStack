import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts } from "../controllers/productsController";

const productsRouter = Router();

productsRouter.get("/products", getAllProducts)
productsRouter.post("/products", createProduct)
productsRouter.delete("/products/:id", deleteProduct)

export default productsRouter;