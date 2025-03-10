import { Queue } from "bullmq";
import { IEmailService } from "../types";


export class EmailQueueService implements IEmailService {

    private emailQueue: Queue

    constructor(emailQueue: Queue){
        this.emailQueue = emailQueue
    }

    async sendWelcomeEmail(data): Promise<void> {
        await this.emailQueue.add("welcome", data)
        return null
    }

    async sendVerificationEmail(data): Promise<void> {
        await this.emailQueue.add("verification", data)
        return null
    }

    async passwordResetEmail(data): Promise<void> {
        await this.emailQueue.add("welcome", data)
        return null
    }
}