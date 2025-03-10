import * as mongoose from "mongoose"
import  config from "./index";
// import log from "./logger";

export default async function connectDb(){
    try{
        const dbUri = config.ENV === "DEV" ? config.DB_URI_LOCAL : config.DB_URI
        const dbEnv = config.ENV === "DEV" ? "development" : "production"

        const conn = await mongoose.connect(dbUri);
        console.log(`Connected to MongoDB - ${dbEnv}`);
        
        // log.info("Connected to database")

    }catch (error){
        throw new Error("could not connect to database")
    }
}