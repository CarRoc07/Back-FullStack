import { Router } from "express";
import { loginAuth, refreshAuthToken, registerAuth, updateProfileUser, verifyToken } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", loginAuth)

authRouter.post("/register", registerAuth)

authRouter.get("/refresh", refreshAuthToken)

authRouter.put("/update", verifyToken, updateProfileUser)

export default authRouter;