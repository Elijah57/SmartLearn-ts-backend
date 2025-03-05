import dotenv from "dotenv";

dotenv.config();

const config = {

    HOST: process.env.HOST,
    DB_URI: process.env.DB_URI,
    DB_URI_LOCAL: process.env.DB_URI_LOCAL,
    testDbUri: process.env.DB_URI_LOCAL_TEST,
    DB_URI_TEST: process.env.DB_URI_TEST,
    ENV: process.env.ENV,

    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: process.env.CALLBACK_URL as string,

    redisUrl: process.env.REDIS_URL as string,

    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET,



    redisCacheUrl: process.env.REDIS_CACHE_URL,
    redisSessionUrl: process.env.REDIS_SESSION_URL,


    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_MAIL: process.env.SMTP_MAIL,

    TWILO_SID: process.env.TWILO_SID,
    TWILO_TOKEN: process.env.TWILO_TOKEN,

    CLOUD_NAME: process.env.CLOUD_NAME as string,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY as string,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET as string,

    RABBITMQ_URL: process.env.RABBITMQ_URL as string

}

export default config;