import { AuthServices } from '../services/auth.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: { accessToken },
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await AuthServices.getMeFromDB(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  userLogin,
  getMe,
};
