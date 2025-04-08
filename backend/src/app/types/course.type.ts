/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TCourse = {
  thumbnail?: string;
  title: string;
  price: number;
  description: string;
  modules: Types.ObjectId[];
};

export interface CourseModel extends Model<TCourse> {
  isCourseExists(courseId: string): Promise<TCourse>;
}
