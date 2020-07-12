import {
  FETCHING_DEPLOYMENTS,
  LOAD_DEPLOYMENTS,
  FAILED_TO_FETCH_DEPLOYMENTS,
  ADDING_DEPLOYMENT,
  DEPLOYMENT_ADDED,
  FAILED_TO_ADD_DEPLOYMENT,
  DELETING_DEPLOYMENT,
  DEPLOYMENT_DELETED,
  FAILED_TO_DELETE_DEPLOYMENT,
  DeploymentState,
  DeploymentActionTypes,
} from "./types";
import { fromJS } from "immutable";

const initialState: DeploymentState = fromJS({
  list: [],
  loading: true,
  error: "",
  adding: false,
  deletingDeployment: null 
})

export default function deploymentReducer(state = initialState, action: DeploymentActionTypes): DeploymentState {
  switch(action.type) {
    case FETCHING_DEPLOYMENTS: {
      return state.set('loading', true)
        .set('error', "");
    }
    case LOAD_DEPLOYMENTS: {
      return state.set('loading', false)
        .set('list', fromJS(action.deployments));
    }
    case FAILED_TO_FETCH_DEPLOYMENTS: {
      return state.set('loading', false)
        .set('error', action.error.message);
    }
    case ADDING_DEPLOYMENT: {
      return state.set('adding', true);
    }
    case DEPLOYMENT_ADDED: {
      return state.set('adding', false)
        .update('list', (deployments) => deployments.unshift(fromJS(action.deployment)));
    }
    case FAILED_TO_ADD_DEPLOYMENT: {
      return state.set('adding', false);
    }
    case DELETING_DEPLOYMENT: {
      return state.set('deletingDeployment', action.deploymentId);
    }
    case DEPLOYMENT_DELETED: {
      const deploymentId = state.get('deletingDeployment');
      return state.set('deletingDeployment', null)
        .update('list', (deployments) => deployments.filter((deployment: any) => deployment.get('_id') !== deploymentId));
    }
    case FAILED_TO_DELETE_DEPLOYMENT: {
      return state.set('deletingDeployment', null);
    }
    default:
      return state;
  }
}