import dotenv from "dotenv";

dotenv.config();

const config = {
    HOST: process.env.HOST,
    DB_URI: process.env.DB_URI,
    ENV: process.env.ENV,

    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET,


    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_MAIL: process.env.SMTP_MAIL,

    TWILO_SID: process.env.TWILO_SID,
    TWILO_TOKEN: process.env.TWILO_TOKEN

}

export default config;