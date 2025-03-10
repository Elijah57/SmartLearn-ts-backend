import {Redis} from "ioredis"
import { RedisStore } from "connect-redis"
import config from "."


const connectRedisClient = (url:any, type: string) : Redis=>{
    try{
        const conn = new Redis(url, {maxRetriesPerRequest: null})
        console.log(`connected to redis -${type}`)
        return conn
    }catch(err){
        console.log("Error: could not connect to database", err)
    }
}

export const redisCacheClient = connectRedisClient(config.redisCacheUrl, "cache")
export const redisStoreClient = connectRedisClient(config.redisSessionUrl, "session")
