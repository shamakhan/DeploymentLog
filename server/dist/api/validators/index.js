"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validatorjs_1 = __importDefault(require("validatorjs"));
var validator = function (body, rules, callback, customMessages) {
    var validation = new validatorjs_1.default(body, rules, customMessages);
    validation.passes(function () { return callback(null, true); });
    validation.fails(function () { return callback(validation.errors, false); });
};
var validationErrorResponse = function (res, errors) {
    res.status(422)
        .json({
        status: "FAILURE",
        message: "Invalid data given",
        data: errors
    });
};
var deployment = function (req, res, next) {
    var rules = {
        url: "required|string",
        templateName: "required|string",
        version: "required|string"
    };
    validator(req.body, rules, function (errors, isValid) {
        if (!isValid) {
            return validationErrorResponse(res, errors);
        }
        next();
    });
};
exports.default = {
    deployment: deployment
};
