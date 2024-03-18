import { Router } from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/getUser", authMiddleware, getUser);
userRouter.put("/updateUser", authMiddleware, updateUser);

export { userRouter };
