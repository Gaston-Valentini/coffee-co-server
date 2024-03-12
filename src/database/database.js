import { connect } from "mongoose";
import { app } from "../app/app.js";

const databaseConnection = async () => {
    try {
        await connect(app.get("DATABASE"));
        console.log("Connected to database coffee-co");
    } catch (error) {
        console.error(`Database connection error: ${error}`);
    }
};

export { databaseConnection };
