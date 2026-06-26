import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/pg/User.js';
import { AuthRequest } from '../types/index.js';
import appError from '../utils/appError.js';
import httpStatus from '../types/httpStatus.js';
import { StringDataType } from 'sequelize';

interface JwtPayload {
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

    const token  = authHeader.split(' ')[1];

    // verify token
    const decoded = jwt.verify( token as string , process.env.JWT_ACCESS_SECRET as string ) ;

    // check user still exists and is active
    const user = await User.findOne({
      where: { id: decoded.userId, isActive: true },
      attributes: ['id', 'email', 'role', 'isVerified'],
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