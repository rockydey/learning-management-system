"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const validatedRequest_1 = __importDefault(require("../middleware/validatedRequest"));
const module_validation_1 = require("../validation/module.validation");
const module_controller_1 = require("../controllers/module.controller");
const router = (0, express_1.Router)();
router.post('/create-module', (0, auth_1.default)('admin'), (0, validatedRequest_1.default)(module_validation_1.ModuleValidation.createModuleValidationSchema), module_controller_1.ModuleControllers.createModule);
exports.ModuleRoutes = router;
