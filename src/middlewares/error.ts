import { NextFunction, Response, Request } from "express";
import config from "../configs";

class HttpError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode
    }
}

class BadRequest extends HttpError {
    constructor(message: string){
        super(400, message)
    }
}

class ResourceNotFound extends HttpError{
    constructor(message: string){
        super(404, message)
    }
}

class Unauthorized extends HttpError {
    constructor(message: string) {
      super(401, message);
    }
  }
  
  class Forbidden extends HttpError {
    constructor(message: string) {
      super(403, message);
    }
  }
  
  class Conflict extends HttpError {
    constructor(message: string) {
      super(409, message);
    }
  }

  class InvalidInput extends HttpError {
    constructor(message: string) {
      super(422, message);
    }
  }
  
  class ServerError extends HttpError {
    constructor(message: string) {
      super(500, message);
    }
  }

  const routeNotFound = (req: Request, res: Response, next:NextFunction)=>{
    const message = `Route not Found: ${req.originalUrl}`;
    res.status(404).json({status: false, message})

  }

  const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message;
    const cleanedMessage = message.replace(/"/g, "")
    res.status(statusCode).json({
        statusCode, 
        message: cleanedMessage, 
        // stack: config.ENV === "PROD" ? "" : err.stack
    })
  }

  export {
    ServerError,
    Conflict,
    Forbidden,
    Unauthorized,
    ResourceNotFound,
    BadRequest,
    InvalidInput,
    HttpError,
    routeNotFound,
    errorHandler,
  };