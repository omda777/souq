import { Request, Response, NextFunction } from 'express';
import appError from '../utils/appError.js';
import { AuthRequest, UserRole } from '../types/index.js';
import httpStatus from '../types/httpStatus.js';

const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as AuthRequest).user;

    if (!user) {
      return next(new appError(401, 'You must be logged in', httpStatus.UNAUTHORIZED));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(
        new appError(403,
          `Access denied. Required role: ${allowedRoles.join(' or ')}`,
          httpStatus.FORBIDDEN
        )
      );
    }

    next();
  };
};

export default authorize;