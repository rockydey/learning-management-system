"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPDF = exports.pdf = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
// Cloudinary Configuration
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
// Multer Storage Configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads'); // Save PDFs in 'uploads' folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
// File Filter to allow only PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept PDF file
    }
    else {
        cb(new AppError_1.default(400, 'Only PDF files are allowed!'), false); // Reject non-PDF files
    }
};
// Define multer upload middleware for PDFs (allows multiple files)
exports.pdf = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
}).array('pdfNotes', 10); // max 10 PDFs at a time
// Function to upload PDFs to Cloudinary
const uploadPDF = (path, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadResult = yield cloudinary_1.v2.uploader.upload(path, {
            public_id: fileName,
        });
        if (!uploadResult || !uploadResult.secure_url) {
            throw new Error('Failed to upload PDF file to Cloudinary.');
        }
        // Delete the file after successful upload
        fs_1.default.unlink(path, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
            else {
                console.log('File deleted successfully!');
            }
        });
        return uploadResult;
    }
    catch (error) {
        console.error('Upload Error:', error.message || error);
        throw new AppError_1.default(500, 'Error uploading PDF: ' + error.message);
    }
});
exports.uploadPDF = uploadPDF;
