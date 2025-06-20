import { model, Schema } from 'mongoose';
import { TProgress } from '../types/progress.type';

const progressSchema = new Schema<TProgress>({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  moduleProgress: [
    {
      moduleId: { type: String, required: true },
      lectures: [
        {
          lectureId: { type: String, required: true },
          unlocked: { type: Boolean, default: false },
        },
      ],
    },
  ],
});

const Progress = model<TProgress>('Progress', progressSchema);

export default Progress;
