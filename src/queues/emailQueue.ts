import {Queue} from "bullmq";
import {redisCacheClient} from "../configs/redis";


const emailQueue = new Queue("emailQueue", { connection: redisCacheClient })

export  default emailQueue