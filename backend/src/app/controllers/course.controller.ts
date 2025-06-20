import { CourseServices } from '../services/course.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const createCourse = catchAsync(async (req, res) => {
  const file = req.file;

  const result = await CourseServices.createCourseIntoDB(file, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course created successfully!',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courses fetched successfully!',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course fetched successfully!',
    data: result,
  });
});

const purchaseCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const email = req?.user?.email;

  const result = await CourseServices.purchaseCourse(id, email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course purchase successful!',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.deleteCourse(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course deleted successfully!',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  purchaseCourse,
  deleteCourse,
};
