import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "../router/authRouter.js";
import { userRouter } from "../router/userRouter.js";

const app = express();
dotenv.config();

// Settings
app.set("PORT", process.env.PORT || 3000);
app.set("DATABASE", process.env.DATABASE);
app.set("TOKEN_SECRET", process.env.TOKEN_SECRET);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Router
app.use("/auth", authRouter);
app.use("/user", userRouter);

export { app };
