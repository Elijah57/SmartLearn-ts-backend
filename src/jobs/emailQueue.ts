import Bull from "bull";
import { connectRedisClient } from "../configs/redis";

const emailQueue = new Bull("smart-queue", {
    createClient: connectRedisClient
})

export  default emailQueue