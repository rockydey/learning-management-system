import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }),
    email: z.string({ required_error: 'Email is required!' }).email(),
    number: z.string({ required_error: 'Number is required!' }),
    password: z
      .string({ required_error: 'Password is required!' })
      .min(8, { message: 'Password should be minimum 8 characters!' }),
    role: z.enum(['user', 'admin']).default('user').optional(),
    status: z.enum(['active', 'blocked']).default('active').optional(),
  }),
});

export const AuthValidation = {
  registerUserValidationSchema,
};
