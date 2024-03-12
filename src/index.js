import { databaseConnection } from "../src/database/database.js";
import { app } from "./app/app.js";

const startServer = async () => {
    try {
        await databaseConnection();
        app.listen(app.get("PORT"), () => {
            console.log(`Server listening on port ${app.get("PORT")}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error}`);
    }
};

startServer();
