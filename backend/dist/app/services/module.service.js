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
exports.ModuleServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const course_model_1 = require("../models/course.model");
const AppError_1 = __importDefault(require("../errors/AppError"));
const module_model_1 = require("../models/module.model");
const createModuleIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Check course existence inside the transaction
        const existingCourse = yield course_model_1.Course.isCourseExists(payload.course.toString());
        if (!existingCourse) {
            throw new AppError_1.default(404, 'Course not found');
        }
        // Count existing modules for moduleNumber
        const moduleCount = yield module_model_1.Module.countDocuments({
            course: payload.course,
        }).session(session);
        // Create the module
        const [createdModule] = yield module_model_1.Module.create([
            Object.assign(Object.assign({}, payload), { moduleNumber: moduleCount + 1 }),
        ], { session });
        // Push module to course
        yield course_model_1.Course.findByIdAndUpdate(payload.course, { $push: { modules: createdModule._id } }, { session });
        // Commit
        yield session.commitTransaction();
        return createdModule;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(400, error === null || error === void 0 ? void 0 : error.message);
    }
    finally {
        session.endSession();
    }
});
const deleteModuleFromDB = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(moduleId);
    const module = yield module_model_1.Module.findById(objectId);
    if (!module) {
        throw new AppError_1.default(404, 'Module not found!');
    }
    const courseId = module.course;
    const course = yield course_model_1.Course.findById(courseId);
    if (!course) {
        throw new AppError_1.default(404, 'Course not found!');
    }
    const moduleIndex = course.modules.indexOf(objectId);
    if (moduleIndex > -1) {
        course.modules.splice(moduleIndex, 1);
        yield course.save();
    }
    else {
        throw new AppError_1.default(404, 'Module reference not found in course!');
    }
    const result = yield module_model_1.Module.findByIdAndDelete(objectId);
    if (!result) {
        throw new AppError_1.default(404, 'Module could not be deleted!');
    }
    return result;
});
const getModuleByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield module_model_1.Module.findById(id);
    return result;
});
const updateModuleIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield module_model_1.Module.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.ModuleServices = {
    createModuleIntoDB,
    deleteModuleFromDB,
    getModuleByIdFromDB,
    updateModuleIntoDB,
};
