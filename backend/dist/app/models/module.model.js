"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const mongoose_1 = require("mongoose");
const lectureSchema = new mongoose_1.Schema({
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
const moduleSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    course: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Course' },
    moduleNumber: { type: Number, required: true },
    lectures: { type: [lectureSchema], required: true },
}, { timestamps: true });
exports.Module = (0, mongoose_1.model)('Module', moduleSchema);
