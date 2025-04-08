/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TModule } from '../types/module.type';
import { Course } from '../models/course.model';
import AppError from '../errors/AppError';
import { Module } from '../models/module.model';

const createModuleIntoDB = async (payload: TModule) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Check course existence inside the transaction
    const existingCourse = await Course.isCourseExists(
      payload.course.toString(),
    );
    if (!existingCourse) {
      throw new AppError(404, 'Course not found');
    }

    // Count existing modules for moduleNumber
    const moduleCount = await Module.countDocuments({
      course: payload.course,
    }).session(session);

    // Create the module
    const [createdModule] = await Module.create(
      [
        {
          ...payload,
          moduleNumber: moduleCount + 1,
        },
      ],
      { session },
    );

    // Push module to course
    await Course.findByIdAndUpdate(
      payload.course,
      { $push: { modules: createdModule._id } },
      { session },
    );

    // Commit
    await session.commitTransaction();
    return createdModule;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(400, error?.message);
  } finally {
    session.endSession();
  }
};

export const ModuleServices = {
  createModuleIntoDB,
};
