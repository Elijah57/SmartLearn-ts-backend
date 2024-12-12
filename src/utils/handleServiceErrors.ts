import { HttpError } from "../middlewares"

const handleServiceError = async (fn: Function)=>{
    try{
        return await fn()
    }catch(error){
        if(error instanceof HttpError){
            throw error
        }else{
            throw new HttpError(error.statusCode || 500, error.message || error)
        }
    }
}

export default handleServiceError