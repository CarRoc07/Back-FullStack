import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts } from "../controllers/productsController";
import { verifyAdmin } from "../controllers/authController";

const productsRouter = Router();

productsRouter.get("/products", getAllProducts)
productsRouter.post("/products", verifyAdmin , createProduct)
productsRouter.delete("/products/:id", verifyAdmin, deleteProduct)

export default productsRouter;