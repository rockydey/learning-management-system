import { Router } from 'express';
import validateRequest from '../middleware/validatedRequest';
import { AuthValidation } from '../validation/auth.validation';
import { AuthControllers } from '../controllers/auth.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);

export const AuthRoutes = router;
