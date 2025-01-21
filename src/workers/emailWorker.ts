import sendMail from "../services/emailService";
import { Worker } from "bullmq";
import connection from "../configs/redis";


console.log("email worker running")

const emailWorker = new Worker("emailQueue", async (job: any)=>{
    switch(job.task){
      case "activate":

        const {to, user, link, emailTemplate, subject} = job.data
        console.log(to, user, link, emailTemplate, subject)

        const emailData = {
          user: user,
          otp: link
        }
        const mailSent = await sendMail({
          subject: subject,
          to: to,
          data: emailData,
          template: emailTemplate
        });

              
    }
}, { connection

})

// emailQueue.process("verification",async (job)=>{
//     switch (job.data.task){
//         case 'activate':

//             const {email, user, otp, emailTemplate, emailSubject} = job.data()
//             console.log(email, user, otp, emailTemplate, emailSubject)
//             const emailData = {
//                 user: user,
//                 otp: otp
//             }
//             const mailSent = await sendMail({
//                         subject: emailSubject,
//                         to: email,
//                         data: emailData,
//                         template: emailTemplate
//                     });
        
//         case '':
//     }

// })

emailWorker.on('failed', (job, err) => {
    console.error(`Job failed. ID: ${job.id}, Error: ${err.message}`);
  });
  
emailWorker.on('completed', (job) => {
    console.log(`Job completed successfully. ID: ${job.id}`);
  });