import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Settings
app.set("PORT", process.env.PORT || 3000);
app.set("DATABASE", process.env.DATABASE);

export { app };
