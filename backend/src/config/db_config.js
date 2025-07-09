import mongoose from 'mongoose';
import dotenv from "dotenv"
import serverConfig from './serverConfig.js';
dotenv.config()
/**
 * The below function helps us to connect to a MongoDB server
 */
async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Successfully connected to the MongoDB.....");
    } catch (error) {
        console.log("Not able to connect to the MongoDB server");
        console.log(error);
    }
}

export default connectDB;