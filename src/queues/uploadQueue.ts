import { Queue } from "bullmq";
import { redisCacheClient} from "../configs/redis";

const uploadQueue = new Queue("uploadQueue", { connection: redisCacheClient })

export default uploadQueue