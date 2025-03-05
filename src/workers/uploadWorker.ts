import { Worker } from "bullmq";
import {redisCacheClient} from "../configs/redis";


const uploadWorker = new Worker("uploadQueue", async (job: any)=>{
    switch(job.task){
        case "profile-image":
            const {} = job.data
    }
}, {connection: redisCacheClient})


uploadWorker.on('failed', (job, err) => {
    console.error(`Job failed. ID: ${job.id}, Error: ${err.message}`);
  });
  
uploadWorker.on('completed', (job) => {
    console.log(`Job completed successfully. ID: ${job.id}`);
  });