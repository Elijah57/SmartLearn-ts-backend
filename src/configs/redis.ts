import {Redis} from "ioredis"
import { RedisStore } from "connect-redis"
import config from "."

export const connectRedisClient = ()=>{
    return new Redis(config.redisUrl)
}

let redisClient = connectRedisClient();

export const redisStore = new RedisStore({
    client: redisClient
})