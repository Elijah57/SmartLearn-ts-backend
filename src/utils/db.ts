import * as mongoose from "mongoose"
import  config from "../configs/index";
// import log from "./logger";

export default async function connectDb(){
    try{

        await mongoose.connect(config.DB_URI);
        console.log("Database connection successful");
        // log.info("Connected to database")

    }catch (error){
        throw new Error("could not connect to database")
    }
}