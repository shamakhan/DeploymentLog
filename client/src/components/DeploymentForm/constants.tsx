import Validator from 'validatorjs';
import { IDeploymentInput } from "../../interfaces/IDeployment";

const rules = {
  url: "required|string|min:8|url",
  templateName: "required|string",
  version: "required|string"
};

export const validate = (formData: IDeploymentInput) => {
  const validation = new Validator(formData, rules);
  if (validation.passes()) {
    return {valid: true};
  }
  return { valid: false, errors: validation.errors };
}