import { Schema, model } from "mongoose";

export const UserModel = model(
    "User",
    new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            surname: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            photo: {
                type: String,
                required: true,
                default: "https://lippianfamilydentistry.net/wp-content/uploads/2015/11/user-default.png",
            },
            role: {
                type: String,
                required: true,
                default: "user",
            },
            active: {
                type: Boolean,
                required: true,
                default: true,
            },
        },
        {
            timestamps: true,
        }
    )
);
