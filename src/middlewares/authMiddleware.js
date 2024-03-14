import { app } from "../app/app.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Unexpected authentication token",
        });
    }

    try {
        const decoded = jwt.verify(token, app.get("TOKEN_SECRET"));
        console.log(decoded);

        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid authentication token",
        });
    }
};

export { authMiddleware };
