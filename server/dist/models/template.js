"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var templateSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    versions: [{
            type: String,
        }]
});
var Template = mongoose_1.default.model('Template', templateSchema);
exports.default = Template;
