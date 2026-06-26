import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../middlewares/catchAsync.js';
import authService from './auth.service.js';
import { sendCreated } from '../../utils/apiResponse.js';

const register = catchAsync( async (req:Request , res:Response , next:NextFunction) => {
    
    const user =  await authService.register(req.body);
    
    return sendCreated(
    res,
    user,
    'Account created successfully. Please check your email to verify.'
  );

});

const login = catchAsync( async (req:Request , res:Response , next:NextFunction) => {
  console.log('Login request body:', req.body); // Debugging line
  const user =  await authService.login(req.body);
  return res.status(200).json({
    status: 'success',
    message: 'Logged in successfully',
    data: user,
  });
    
});

export default {register ,login}