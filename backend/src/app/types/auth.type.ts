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
