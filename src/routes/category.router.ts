import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoryController";
import { verifyAdmin } from "../controllers/authController";

const categoryRouter = Router();

categoryRouter.get("/category", getCategories)
categoryRouter.post("/category", verifyAdmin, createCategory)

export default categoryRouter;