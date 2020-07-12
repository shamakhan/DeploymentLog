"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var deploymentSchema = new mongoose_1.default.Schema({
    url: {
        type: String,
        required: true,
    },
    templateName: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    deployedAt: {
        type: Date,
        default: Date.now
    }
});
var Deployment = mongoose_1.default.model('Deployment', deploymentSchema);
exports.default = Deployment;
