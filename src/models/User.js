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
                type: Number,
                required: true,
            },
            photo: {
                type: String,
                default: "../assets/images/user-default.png",
            },
            role: {
                type: String,
                required: true,
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
