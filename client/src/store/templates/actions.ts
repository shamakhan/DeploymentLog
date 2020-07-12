import { ITemplate } from "../../interfaces/ITemplate";

import {
  FETCH_TEMPLATES,
  LOAD_TEMPLATES,
  FAILED_TO_FETCH_TEMPLATES,
  TemplateActionTypes
} from "./types";

export const fetchTemplates = () : TemplateActionTypes => {
  return {
    type: FETCH_TEMPLATES,
  }
};

export const loadTemplates = (templates: ITemplate[]) : TemplateActionTypes => {
  return {
    type: LOAD_TEMPLATES,
    templates
  }
}

export const failedFetchingTemplates = (error: Error) : TemplateActionTypes => {
  return {
    type: FAILED_TO_FETCH_TEMPLATES,
    error
  }
}
