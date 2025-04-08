import { Router } from 'express';
import auth from '../middleware/auth';
import validateRequest from '../middleware/validatedRequest';
import { CourseValidation } from '../validation/course.validation';
import { CourseControllers } from '../controllers/course.controller';

const router = Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(CourseValidation.createCourseValidation),
  CourseControllers.createCourse,
);

export const CourseRoutes = router;
