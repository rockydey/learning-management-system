import { User } from '../models/auth.model';
import { TRegisterUser } from '../types/auth.type';

const registerUserIntoDB = async (payload: TRegisterUser) => {
  const result = await User.create(payload);

  return result;
};

export const AuthServices = {
  registerUserIntoDB,
};
