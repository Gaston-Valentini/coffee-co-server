import { Router } from "express";
import { register } from "../controllers/controllers.js";

const authRouter = Router();

authRouter.post("/register", register);

export { authRouter };
