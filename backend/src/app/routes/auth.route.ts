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

router.post(
  '/login',
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthControllers.userLogin,
);

export const AuthRoutes = router;
