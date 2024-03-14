import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/getUser", authMiddleware, getUser);

export { userRouter };
