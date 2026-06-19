import {Router , Request , Response} from 'express';
import authController from './auth.controller.js';

const router = Router();

// Register route
router.post('/register' ,authController.register);


export default router;