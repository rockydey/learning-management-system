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

const deleteModuleFromDB = async (moduleId: string) => {
  const objectId = new mongoose.Types.ObjectId(moduleId);

  const module = await Module.findById(objectId);

  if (!module) {
    throw new AppError(404, 'Module not found!');
  }

  const courseId = module.course;

  const course = await Course.findById(courseId);

  if (!course) {
    throw new AppError(404, 'Course not found!');
  }

  const moduleIndex = course.modules.indexOf(objectId);
  if (moduleIndex > -1) {
    course.modules.splice(moduleIndex, 1);
    await course.save();
  } else {
    throw new AppError(404, 'Module reference not found in course!');
  }

  const result = await Module.findByIdAndDelete(objectId);

  if (!result) {
    throw new AppError(404, 'Module could not be deleted!');
  }

  return result;
};

const getModuleByIdFromDB = async (id: string) => {
  const result = await Module.findById(id);
  return result;
};

const updateModuleIntoDB = async (id: string, payload: Partial<TModule>) => {
  const result = await Module.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const ModuleServices = {
  createModuleIntoDB,
  deleteModuleFromDB,
  getModuleByIdFromDB,
  updateModuleIntoDB,
};
