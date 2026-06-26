import {Response} from 'express';
import httpStatus from '../types/httpStatus.js';


export const sendCreated = (
    res: Response ,
    data : any ,
    message : string = 'Resource created successfully'
    ) : Response => {
        
    return res.status(201).json({
        status: httpStatus.SUCCESS,
        message,
        data
    });
};