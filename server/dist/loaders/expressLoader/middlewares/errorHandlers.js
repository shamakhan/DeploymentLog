"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../../../config"));
exports.default = (function (_a) {
    var app = _a.app;
    app.use(function (req, res, next) {
        var error = new Error("Not Found - " + req.originalUrl);
        res.status(404);
        next(error);
    });
    app.use(function (error, req, res, next) {
        res.statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.json({
            status: "FAILURE",
            message: error.message || "Something went wrong",
            stack: config_1.default.app.env === 'production' ? null : error.stack
        });
    });
});
