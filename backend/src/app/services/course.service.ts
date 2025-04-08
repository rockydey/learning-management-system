/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const CourseServices = {
  createCourseIntoDB,
};
