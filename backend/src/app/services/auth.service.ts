import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../models/auth.model';
import { TLoginUser, TRegisterUser } from '../types/auth.type';
import jwt, { JwtPayload } from 'jsonwebtoken';

const registerUserIntoDB = async (payload: TRegisterUser) => {
  const result = await User.create(payload);

  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload?.email);

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(400, 'User has been deleted');
  }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(403, 'User has been blocked');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(400, 'Password do not match');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
  };
};

const getMeFromDB = async (payload: JwtPayload) => {
  const { role, email } = payload;

  const result = await User.findOne({ role, email }).populate('purchaseCourse');

  return result;
};

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
  getMeFromDB,
};
