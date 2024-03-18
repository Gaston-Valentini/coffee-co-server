import { UserModel } from "../models/User.js";

const getUser = async (req, res) => {
    try {
        const { id } = req.user;

        const userFound = await UserModel.findById(id);

        const { password, ...userWithoutPassword } = userFound._doc;

        return res.status(200).json({
            success: true,
            user: userWithoutPassword,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const body = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(id, body);

        const { password, ...userWithoutPassword } = updatedUser._doc;

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            updatedUser: userWithoutPassword,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export { getUser, updateUser };
