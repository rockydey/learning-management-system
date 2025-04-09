/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../errors/AppError';
import { Course } from '../models/course.model';
import { TCourse } from '../types/course.type';
import { uploadImage } from '../utils/uploadImage';

const createCourseIntoDB = async (file: any, payload: TCourse) => {
  // Upload image to cloudinary
  const path = file?.path;
  const fileName = `${payload?.title}`;
  const uploadResult = await uploadImage(path, fileName);

  if (uploadResult) {
    const { secure_url } = uploadResult;
    payload.thumbnail = secure_url;
  }

  const result = await Course.create(payload);

  return result;
};

const getAllCoursesFromDB = async () => {
  const courses = await Course.find().populate('modules');
  return courses;
};

const getSingleCourseFromDB = async (id: string) => {
  const courseExists = await Course.isCourseExists(id);

  if (!courseExists) {
    throw new AppError(404, 'Course not found!');
  }

  const course = await Course.findById(id).populate('modules');
  return course;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
};
