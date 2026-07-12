import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import appError from "../utils/appError.js";
import httpStatus from "../types/httpStatus.js"

type ValidationTarget = "body" | "query" | "params" ;

const validate = (schema :ZodSchema , target : ValidationTarget = "body") =>{
    return (req : Request , res :Response , next : NextFunction)=>{
        const result = schema.safeParse(req[target]);

        if(!result.success){
            const msg = "validation Errors :\n" 
                + result.error.issues
                    .map((issue) => `${issue.path.join('.') || target}: ${issue.message}`)
                    .join('\n');
            
            return next(new appError(400 , msg , httpStatus.BAD_REQUEST))
        }

        // (req as Record<string, unknown>)[target] = result.data;
        next();
    }
}

export default validate;