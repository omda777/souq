import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../middlewares/catchAsync.js';
import authService from './auth.service.js';

const register = catchAsync( async (req:Request , res:Response , next:NextFunction) => {
    console.log(req.body);
    await authService.register(req.body);
    res.status(201).json({
        status: 'success',
        message: 'User registered successfully'
    });

});

export default {register}