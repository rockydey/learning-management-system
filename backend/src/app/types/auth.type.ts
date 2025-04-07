/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TRegisterUser = {
  name: string;
  email: string;
  number: string;
  password: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  isDeleted: boolean;
  profileImg?: string;
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
