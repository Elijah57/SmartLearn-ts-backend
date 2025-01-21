import { Request, Response, NextFunction } from "express"

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<any> | void;

const asyncWrapper = (fn: MiddlewareFunction)=>{
    return async (req: Request, res: Response, next: NextFunction)=>{

        try{
            await fn(req, res, next)
        }catch(err){
            // console.error("Async error:", err.stack || err.message);
            next(err)
        }
}
}

export default asyncWrapper;