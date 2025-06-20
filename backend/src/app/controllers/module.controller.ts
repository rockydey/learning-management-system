import { ModuleServices } from '../services/module.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const createModule = catchAsync(async (req, res) => {
  const result = await ModuleServices.createModuleIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Module created successfully!',
    data: result,
  });
});

const deleteModule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ModuleServices.deleteModuleFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Module deleted successfully!',
    data: result,
  });
});

const getModuleById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ModuleServices.getModuleByIdFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Module fetched successfully!',
    data: result,
  });
});

const updateModule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ModuleServices.updateModuleIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Module updated successfully!',
    data: result,
  });
});

export const ModuleControllers = {
  createModule,
  deleteModule,
  getModuleById,
  updateModule,
};
