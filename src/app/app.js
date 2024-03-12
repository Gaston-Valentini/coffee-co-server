import express from "express";
import dotenv from "dotenv";
import { authRouter } from "../router/authRouter.js";

const app = express();
dotenv.config();

// Settings
app.set("PORT", process.env.PORT || 3000);
app.set("DATABASE", process.env.DATABASE);

// Router
app.use("/auth", authRouter);

export { app };
