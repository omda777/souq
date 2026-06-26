import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";

export default function catchAsync(fn: Function) {
    return function (req:Request , res:Response , next:NextFunction){
        fn(req, res, next).catch((err:AppError) => { next(err); });
    }
};