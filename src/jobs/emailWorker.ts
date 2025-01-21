import Bull from "bull";
import { connectRedisClient } from "../configs/redis";

const queue = new Bull("smart-queue", {
    createClient: connectRedisClient
})