import express, { Request, Response } from "express";
import authRouter from "./routers/auth";
import { errorHandler, performanceLogger, routeNotFound } from "./middlewares"
import userRouter from "./routers/user";
import courseRouter from "./routers/course";
import cors from "cors";
import session from "express-session";
import { RedisStore } from "connect-redis"
import { redisStoreClient } from "./configs/redis";
import passport from "./configs/passport-config"
import googleOauthRouter from "./routers/google";

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

const redisStore = new RedisStore({
    client: redisStoreClient
})

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: redisStore
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(performanceLogger)
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/", googleOauthRouter);
app.use("/api", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/auth", authRouter)

app.use(routeNotFound);
app.use(errorHandler);


export default app;