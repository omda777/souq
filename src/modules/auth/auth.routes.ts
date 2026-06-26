import {Router , Request , Response} from 'express';
import authController from './auth.controller.js';

const router = Router();

router.post('/register' ,authController.register);
router.post('/login' ,authController.login);
// router.post('/refresh' ,authController.refresh);
// router.post('/logout' ,authController.logout);
// router.get('/verify-email/:token' ,authController.verifyEmail);

export default router;