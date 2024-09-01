import * as nodemailer from "nodemailer";
import * as path from "path"
import ejs from "ejs"
import config from "../configs";
import { IMail } from "../types";
import { BadRequest } from "../middlewares";

const sendMail = async (emailContent: IMail) =>{

    const transporter = nodemailer.createTransport({
        // host: config.SMTP_HOST,
        // port : config.SMTP_PORT || 587,
        service: config.SMTP_SERVICE,
        secure: false,
        auth: {
            user: config.SMTP_MAIL,
            pass: config.SMTP_PASS
        }

    });

    // get the path to the email template file
    const emailTemplate = path.join(__dirname, "../mails", emailContent.template)

    // render the email data into template with ejs
    const emailHtml = await ejs.renderFile(emailTemplate, emailContent.data);

    const mail = {
        from: config.SMTP_MAIL,
        to: emailContent.to,
        subject: emailContent.subject,
        html: emailHtml
    }

    try{
        await transporter.sendMail(mail);
        return {mailSent: true};
    }
    catch(error){
        // console.log(error)
        throw new BadRequest("Email sending failed!")
    }


}  

export default sendMail;