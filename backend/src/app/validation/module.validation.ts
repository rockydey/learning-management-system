import { z } from 'zod';

const createLectureValidationSchema = z.object({
  title: z.string({ required_error: 'Lecture title is required!' }),
  videoURL: z.string({ required_error: 'Video URL is required!' }),
  pdfLinks: z.array(z.string()).optional().default([]),
  locked: z.boolean().optional().default(true),
});

const createModuleValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Module title is required!' }),
    course: z.string({ required_error: 'Course is required!' }),
    lectures: z
      .array(createLectureValidationSchema)
      .min(1, 'At least one lecture is required'),
  }),
});

export const ModuleValidation = {
  createModuleValidationSchema,
};
