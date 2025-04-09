"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth_model_1 = require("../models/auth.model");
const course_model_1 = require("../models/course.model");
const uploadImage_1 = require("../utils/uploadImage");
const createCourseIntoDB = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Upload image to cloudinary
    const path = file === null || file === void 0 ? void 0 : file.path;
    const fileName = `${payload === null || payload === void 0 ? void 0 : payload.title}`;
    const uploadResult = yield (0, uploadImage_1.uploadImage)(path, fileName);
    if (uploadResult) {
        const { secure_url } = uploadResult;
        payload.thumbnail = secure_url;
    }
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getAllCoursesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield course_model_1.Course.find().populate('modules');
    return courses;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const courseExists = yield course_model_1.Course.isCourseExists(id);
    if (!courseExists) {
        throw new AppError_1.default(404, 'Course not found!');
    }
    const course = yield course_model_1.Course.findById(id).populate('modules');
    return course;
});
const purchaseCourse = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const courseExists = yield course_model_1.Course.isCourseExists(id);
    if (!courseExists) {
        throw new AppError_1.default(404, 'Course not found!');
    }
    const updatedUser = yield auth_model_1.User.findOneAndUpdate({ email }, { $addToSet: { purchaseCourse: id } }, { new: true });
    return updatedUser;
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    purchaseCourse,
};
