"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const registerUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required!' }),
        email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
        number: zod_1.z.string({ required_error: 'Number is required!' }),
        password: zod_1.z
            .string({ required_error: 'Password is required!' })
            .min(8, { message: 'Password should be minimum 8 characters!' }),
        role: zod_1.z.enum(['user', 'admin']).default('user').optional(),
        status: zod_1.z.enum(['active', 'blocked']).default('active').optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
exports.AuthValidation = {
    registerUserValidationSchema,
    loginUserValidationSchema,
};
