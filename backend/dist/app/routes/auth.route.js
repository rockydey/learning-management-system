"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validatedRequest_1 = __importDefault(require("../middleware/validatedRequest"));
const auth_validation_1 = require("../validation/auth.validation");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/register', (0, validatedRequest_1.default)(auth_validation_1.AuthValidation.registerUserValidationSchema), auth_controller_1.AuthControllers.registerUser);
router.post('/login', (0, validatedRequest_1.default)(auth_validation_1.AuthValidation.loginUserValidationSchema), auth_controller_1.AuthControllers.userLogin);
router.get('/me', (0, auth_1.default)('admin', 'user'), auth_controller_1.AuthControllers.getMe);
exports.AuthRoutes = router;
