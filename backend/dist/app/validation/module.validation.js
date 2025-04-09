"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleValidation = void 0;
const zod_1 = require("zod");
const createLectureValidationSchema = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Lecture title is required!' }),
    videoURL: zod_1.z.string({ required_error: 'Video URL is required!' }),
    pdfLinks: zod_1.z.array(zod_1.z.string()).optional().default([]),
    locked: zod_1.z.boolean().optional().default(true),
});
const createModuleValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Module title is required!' }),
        course: zod_1.z.string({ required_error: 'Course is required!' }),
        lectures: zod_1.z
            .array(createLectureValidationSchema)
            .min(1, 'At least one lecture is required'),
    }),
});
exports.ModuleValidation = {
    createModuleValidationSchema,
};
