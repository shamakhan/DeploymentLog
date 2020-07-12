"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = __importDefault(require("../models/template"));
var Template = /** @class */ (function () {
    function Template() {
    }
    Template.prototype.all = function () {
        return template_1.default.find();
    };
    return Template;
}());
exports.default = Template;
