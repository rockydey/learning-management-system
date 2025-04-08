import { z } from 'zod';

const createCourseValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }),
    description: z.string({ required_error: 'Description is required!' }),
    price: z.number({ required_error: 'Price is required!' }),
  }),
});

export const CourseValidation = {
  createCourseValidation,
};
