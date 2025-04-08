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

export const ModuleControllers = {
  createModule,
};
