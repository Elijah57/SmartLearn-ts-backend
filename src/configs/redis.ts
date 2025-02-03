import {Redis} from "ioredis"
import { RedisStore } from "connect-redis"
import config from "."

export const connectRedisClient = () : Redis=>{
    return new Redis(config.redisUrl, {maxRetriesPerRequest: null})
}

const connection = new Redis(config.redisUrl, {maxRetriesPerRequest: null})

let redisClient = connectRedisClient();

export const redisStore = new RedisStore({
    client: redisClient
})

export default connection