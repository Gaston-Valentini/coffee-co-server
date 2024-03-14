import { UserModel } from "../models/User.js";
import { registerValidations, loginValidations } from "../functions/validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { app } from "../app/app.js";

const register = async (req, res) => {
    const { name, surname, email, password, phone } = req.body;

    const fieldsValid = registerValidations(name, surname, email, password, phone);

    if (!fieldsValid.success) {
        return res.status(200).json({
            success: fieldsValid.success,
            message: fieldsValid.message,
        });
    }

    try {
        const userFound = await UserModel.findOne({ email });

        if (userFound) {
            return res.status(200).json({
                success: false,
                message: "There is already a user registered with that email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRegistered = await UserModel.create({
            name,
            surname,
            email,
            password: hashedPassword,
            phone,
        });

        const token = jwt.sign(
            {
                id: userRegistered.id,
            },
            app.get("TOKEN_SECRET"),
            {
                expiresIn: "24h",
            }
        );

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const fieldsValid = loginValidations(email, password);

    if (!fieldsValid.success) {
        return res.status(200).json({
            success: fieldsValid.success,
            message: fieldsValid.message,
        });
    }

    try {
        const userFound = await UserModel.findOne({ email });

        if (!userFound) {
            return res.status(200).json({
                success: false,
                message: "Incorrect credentials",
            });
        }

        const unhashedPassword = await bcrypt.compare(password, userFound.password);

        if (!unhashedPassword) {
            return res.status(200).json({
                success: false,
                message: "Incorrect credentials",
            });
        }

        const token = jwt.sign(
            {
                id: userFound.id,
            },
            app.get("TOKEN_SECRET"),
            {
                expiresIn: "24h",
            }
        );

        return res.status(200).json({
            success: true,
            message: "User loged successfully",
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export { register, login };
