"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
// Parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application route
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Academix server is running!');
});
// Global Error Handler
app.use(globalErrorHandler_1.default);
// Not Found Error
app.use(notFound_1.default);
exports.default = app;
