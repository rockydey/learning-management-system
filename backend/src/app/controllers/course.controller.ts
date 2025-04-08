import { CourseServices } from '../services/course.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course created successfully!',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
};
