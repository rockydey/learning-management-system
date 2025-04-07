import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/auth.model';
import { TUserRole } from '../types/auth.type';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'Unauthorized user');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    const user = await User.isUserExists(email);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(404, 'User has been deleted');
    }

    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(403, 'User has been blocked');
    }

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new AppError(401, 'Unauthorized user');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
