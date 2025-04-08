/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import config from '../config';
import AppError from '../errors/AppError';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Cloudinary Upload Result Type
interface UploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads'); // Save PDFs in 'uploads' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// File Filter to allow only PDFs
const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept PDF file
  } else {
    cb(new AppError(400, 'Only PDF files are allowed!'), false); // Reject non-PDF files
  }
};

// Define multer upload middleware for PDFs (allows multiple files)
export const pdf = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array('pdfNotes', 10); // max 10 PDFs at a time

// Function to upload PDFs to Cloudinary
export const uploadPDF = async (
  path: string,
  fileName: string,
): Promise<UploadResult | null> => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: fileName,
    });

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Failed to upload PDF file to Cloudinary.');
    }

    // Delete the file after successful upload
    fs.unlink(path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
    });

    return uploadResult;
  } catch (error: any) {
    console.error('Upload Error:', error.message || error);
    throw new AppError(500, 'Error uploading PDF: ' + error.message);
  }
};
