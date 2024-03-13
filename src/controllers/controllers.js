import { UserModel } from "../models/User.js";
import { registerValidations, loginValidations } from "../functions/validations.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
    const { name, surname, email, password, phone } = req.body;

    const fieldsValid = registerValidations(name, surname, email, password, phone);

    if (!fieldsValid.success) {
        return res.status(400).json({
            success: fieldsValid.success,
            message: fieldsValid.message,
        });
    }

    try {
        const userFound = await UserModel.findOne({ email });

        if (userFound) {
            return res.status(400).json({
                success: false,
                message: "There is already a user registered with that email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            name,
            surname,
            email,
            password: hashedPassword,
            phone,
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
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
        return res.status(400).json({
            success: fieldsValid.success,
            message: fieldsValid.message,
        });
    }

    try {
        const userFound = await UserModel.findOne({ email });

        if (!userFound) {
            return res.status(400).json({
                success: false,
                message: "Incorrect credentials",
            });
        }

        const unhashedPassword = await bcrypt.compare(password, userFound.password);

        if (!unhashedPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect credentials",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successful login",
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
