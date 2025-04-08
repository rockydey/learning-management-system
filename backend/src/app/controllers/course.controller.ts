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

export const CourseControllers = {
  createCourse,
  getAllCourses,
};
