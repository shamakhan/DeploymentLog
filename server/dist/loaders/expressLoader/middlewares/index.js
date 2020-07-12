"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandlers_1 = __importDefault(require("./errorHandlers"));
exports.default = (function (_a) {
    var app = _a.app;
    errorHandlers_1.default({ app: app });
});
