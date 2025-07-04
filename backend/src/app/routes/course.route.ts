import { NextFunction, Request, Response, Router } from 'express';
import auth from '../middleware/auth';
import validateRequest from '../middleware/validatedRequest';
import { CourseValidation } from '../validation/course.validation';
import { CourseControllers } from '../controllers/course.controller';
import { upload } from '../utils/uploadImage';

const router = Router();

router.post(
  '/create-course',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(CourseValidation.createCourseValidation),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourse);

router.post('/purchase/:id', auth('user'), CourseControllers.purchaseCourse);

router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

export const CourseRoutes = router;
