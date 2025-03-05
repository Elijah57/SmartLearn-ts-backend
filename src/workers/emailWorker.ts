import sendMail from "../services/emailService";
import { Worker } from "bullmq";
import {redisCacheClient} from "../configs/redis";
import { publishLogs } from "../queues/producers";


console.log("email worker running")

const emailWorker = new Worker("emailQueue", async (job: any)=>{
    switch(job.task){
      case "activate":
        const {to, user, link, emailTemplate, subject} = job.data
        // console.log(to, user, link, emailTemplate, subject)

        const emailData = {user: user, otp: link}
        const mailSent = await sendMail({
          subject: subject,
          to: to,
          data: emailData,
          template: emailTemplate
        });        
    }
}, { connection: redisCacheClient})

emailWorker.on('failed', (job, err) => {
    console.error(`Job failed. ID: ${job.id}, Error: ${err.message}`);
  });
  
emailWorker.on('completed', (job) => {
    console.log(`Job completed successfully. ID: ${job.id}`);
    const log = {
      level: "info",
      message: `User created: ${job.data.user}` as string
  }
  publishLogs(log)
  });