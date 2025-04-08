import { model, Schema } from 'mongoose';
import { TLecture, TModule } from '../types/module.type';

const lectureSchema = new Schema<TLecture>({
  title: { type: String, required: true },
  videoURL: { type: String, required: true },
  pdfLinks: {
    type: [String],
    default: [],
  },
  locked: {
    type: Boolean,
    default: true,
  },
});

const moduleSchema = new Schema<TModule>(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
    moduleNumber: { type: Number, required: true },
    lectures: { type: [lectureSchema], required: true },
  },
  { timestamps: true },
);

export const Module = model<TModule>('Module', moduleSchema);
