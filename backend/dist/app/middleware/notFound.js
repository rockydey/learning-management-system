"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API Not Found',
        error: '',
    });
    return;
};
exports.default = notFound;
