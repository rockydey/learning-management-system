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

router.delete('/:id', auth('admin'), ModuleControllers.deleteModule);

router.get('/:id', auth('admin'), ModuleControllers.getModuleById);

router.patch('/:id', auth('admin'), ModuleControllers.updateModule);

export const ModuleRoutes = router;
