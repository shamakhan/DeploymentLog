import { ITemplate } from "../../interfaces/ITemplate";
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from "../index";
import { API_ROOT } from "../../constants";

import {
  FETCHING_TEMPLATES,
  LOAD_TEMPLATES,
  FAILED_TO_FETCH_TEMPLATES,
  TemplateActionTypes
} from "./types";

export const fetchTemplates = (): ThunkAction<void, RootState, unknown, Action<string>> => 
  async (dispatch, getState) => {
    dispatch(fetchingTemplates());
    try {
      const response = await fetch(`${API_ROOT}/api/templates`);
      const data = await response.json();
      dispatch(loadTemplates(data.templates));
    } catch (e) {
      dispatch(failedFetchingTemplates(e));
    }
  };

export const fetchingTemplates = () : TemplateActionTypes => {
  return {
    type: FETCHING_TEMPLATES,
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
