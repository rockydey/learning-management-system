import { Course } from '../models/course.model';
import { TCourse } from '../types/course.type';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
};
