import { Types } from 'mongoose';

export type TCourse = {
  thumbnail?: string;
  title: string;
  price: number;
  description: string;
  modules: Types.ObjectId[];
};
