import { Schema, model } from 'mongoose';
import { CourseModel, TCourse } from '../types/course.type';

const courseSchema = new Schema<TCourse, CourseModel>(
  {
    thumbnail: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
  },
  {
    timestamps: true,
  },
);

courseSchema.statics.isCourseExists = async function (courseId: string) {
  return await Course.findById(courseId);
};

export const Course = model<TCourse, CourseModel>('Course', courseSchema);
