"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorSources = [
        {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: error === null || error === void 0 ? void 0 : error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid Id or format.',
        errorSources,
    };
};
exports.default = handleCastError;
