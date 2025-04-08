import { Router } from 'express';
import { AuthRoutes } from './auth.route';
import { CourseRoutes } from './course.route';
import { ModuleRoutes } from './module.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/module',
    route: ModuleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
