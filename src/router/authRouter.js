import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (rea, res) => {
    return res.send("Auth router");
});

export { authRouter };
