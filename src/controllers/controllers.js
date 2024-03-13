import { UserModel } from "../models/User.js";
import { areFieldsValid } from "../functions/validations.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
    const { name, surname, email, password, phone } = req.body;

    const fieldsValid = areFieldsValid(name, surname, email, password, phone);

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

export { register };
