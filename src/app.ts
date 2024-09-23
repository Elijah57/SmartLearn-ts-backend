import express from "express";
import { Request, Response } from "express";
import authRouter from "./routers/auth";
import { errorHandler, routeNotFound } from "./middlewares"
import userRouter from "./routers/user";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/api", userRouter)
app.use("/api/auth", authRouter)

app.use(routeNotFound);
app.use(errorHandler);


export default app;