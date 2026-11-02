import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AuthRequest } from '../types/index.js';
import appError from '../utils/appError.js';
import httpStatus from '../types/httpStatus.js';

interface JwtPayload extends jwt.JwtPayload {
  userId: string;
  role: string;
}

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // extract token from Authorization header
    const authHeader : string | undefined = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new appError(401 ,'Authentication token is missing', httpStatus.UNAUTHORIZED);
    }

    const token = authHeader.slice('Bearer '.length);
    if (!token) {
      throw new appError(401, 'Authentication token is missing', httpStatus.UNAUTHORIZED);
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    if (typeof decoded === 'string') {
      throw new appError(401, 'Invalid token', httpStatus.UNAUTHORIZED);
    }
    const payload = decoded as unknown as JwtPayload;

    // check user still exists and is active
    const user = await User.findOne({
      _id: payload.userId,
      isActive: true,
    });

    if (!user) throw new appError(401, 'User no longer exists', httpStatus.UNAUTHORIZED);

    // attach to request
    (req as AuthRequest).user = {
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new appError(401, 'Invalid token', httpStatus.UNAUTHORIZED));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new appError(401, 'Token has expired, please login again', httpStatus.UNAUTHORIZED));
    }
    next(error);
  }
};

export default authenticate;
