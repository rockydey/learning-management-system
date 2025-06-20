export type TProgress = {
  userId: string;
  courseId: string;
  moduleProgress: Array<{
    moduleId: string;
    lectures: Array<{
      lectureId: string;
      unlocked: boolean;
    }>;
  }>;
};
