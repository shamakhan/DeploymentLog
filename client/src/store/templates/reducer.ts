import {
  FETCHING_TEMPLATES,
  LOAD_TEMPLATES,
  FAILED_TO_FETCH_TEMPLATES,
  TemplateActionTypes,
  TemplateState
} from "./types";
import { fromJS } from "immutable";

const initialState: TemplateState = fromJS({
  list: [],
  loading: true,
  error: "",
})

export default function deploymentReducer(state = initialState, action: TemplateActionTypes): TemplateState {
  switch(action.type) {
    case FETCHING_TEMPLATES: {
      return state.set('loading', true)
        .set('error', "");
    }
    case LOAD_TEMPLATES: {
      return state.set('loading', false)
        .set('list', fromJS(action.templates.reduce((acc, template) => {
          // @ts-ignore
          acc[template.name] = template.versions;
          return acc;
        }, {})));
    }
    case FAILED_TO_FETCH_TEMPLATES: {
      return state.set('loading', false)
        .set('error', action.error.message);
    }
    default:
      return state;
  }
}