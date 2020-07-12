import { List, Map } from "immutable"
import { ITemplate } from "../../interfaces/ITemplate"

export const FETCH_TEMPLATES = "app/deployments/FETCH_TEMPLATES"
export const FETCHING_TEMPLATES = "app/deployments/FETCHING_TEMPLATES"
export const LOAD_TEMPLATES = "app/deployments/LOAD_TEMPLATES"
export const FAILED_TO_FETCH_TEMPLATES =
  "app/deployments/FAILED_TO_FETCH_TEMPLATES"

interface FetchTemplatesAction {
  type: typeof FETCH_TEMPLATES
}

interface FetchingTemplatesAction {
  type: typeof FETCHING_TEMPLATES
}
    
interface LoadTemplatesAction {
  type: typeof LOAD_TEMPLATES
  templates: ITemplate[]
}

interface FailedTemplatesAction {
  type: typeof FAILED_TO_FETCH_TEMPLATES
  error: Error
}

export type TemplateActionTypes = FetchTemplatesAction | FetchingTemplatesAction | LoadTemplatesAction | FailedTemplatesAction;

export interface TemplateState extends Map<String, any> {
  list: List<ITemplate>,
  loading: Boolean,
  errors: String,
};
