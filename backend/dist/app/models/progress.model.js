"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const progressSchema = new mongoose_1.Schema({
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
const Progress = (0, mongoose_1.model)('Progress', progressSchema);
exports.default = Progress;
