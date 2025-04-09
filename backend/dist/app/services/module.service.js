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
exports.ModuleServices = {
    createModuleIntoDB,
};
