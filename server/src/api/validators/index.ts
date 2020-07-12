import { Request, Response, NextFunction } from "express";
import Validator, { Rules, ErrorMessages, Errors } from "validatorjs";

const validator = (body: object, rules: Rules, callback: any, customMessages?: ErrorMessages ) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
}

const validationErrorResponse = (res: Response, errors: Errors) => {
  res.status(422)
    .json({
      status: "FAILURE",
      message: "Invalid data given",
      data: errors
    });
}

const deployment = (req: Request, res: Response, next: NextFunction) => {
  const rules = {
    url: "required|string",
    templateName: "required|string",
    version: "required|string"
  };
  validator(req.body, rules, (errors: Errors, isValid: boolean) => {
    if (!isValid) {
      return validationErrorResponse(res, errors);
    }
    next();
  })
}

export default {
  deployment
}