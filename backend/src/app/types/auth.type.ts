/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from '../constants/user.constant';

export type TRegisterUser = {
  name: string;
  email: string;
  number: string;
  password: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  isDeleted: boolean;
  profileImg?: string;
  purchaseCourse: Types.ObjectId[];
};

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TRegisterUser> {
  isUserExists(email: string): Promise<TRegisterUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
