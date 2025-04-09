"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const validatedRequest_1 = __importDefault(require("../middleware/validatedRequest"));
const course_validation_1 = require("../validation/course.validation");
const course_controller_1 = require("../controllers/course.controller");
const uploadImage_1 = require("../utils/uploadImage");
const router = (0, express_1.Router)();
router.post('/create-course', (0, auth_1.default)('admin'), uploadImage_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validatedRequest_1.default)(course_validation_1.CourseValidation.createCourseValidation), course_controller_1.CourseControllers.createCourse);
router.get('/', course_controller_1.CourseControllers.getAllCourses);
router.get('/:id', course_controller_1.CourseControllers.getSingleCourse);
router.post('/purchase/:id', (0, auth_1.default)('user'), course_controller_1.CourseControllers.purchaseCourse);
exports.CourseRoutes = router;
