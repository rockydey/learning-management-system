import { Router } from 'express';
import auth from '../middleware/auth';
import validateRequest from '../middleware/validatedRequest';
import { ModuleValidation } from '../validation/module.validation';
import { ModuleControllers } from '../controllers/module.controller';

const router = Router();

router.post(
  '/create-module',
  auth('admin'),
  validateRequest(ModuleValidation.createModuleValidationSchema),
  ModuleControllers.createModule,
);

export const ModuleRoutes = router;
