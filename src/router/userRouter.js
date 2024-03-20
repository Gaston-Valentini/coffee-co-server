import { Router } from "express";
import { updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.put("/updateUser", authMiddleware, updateUser);

export { userRouter };
