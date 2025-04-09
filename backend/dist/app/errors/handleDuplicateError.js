"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const match = error.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists!`,
        },
    ];
    const statusCode = 409;
    return {
        statusCode,
        message: 'Duplicate Error',
        errorSources,
    };
};
exports.default = handleDuplicateError;
