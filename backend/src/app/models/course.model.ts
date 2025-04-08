import { Schema, model } from 'mongoose';
import { TCourse } from '../types/course.type';

const courseSchema = new Schema<TCourse>(
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

export const Course = model<TCourse>('Course', courseSchema);
