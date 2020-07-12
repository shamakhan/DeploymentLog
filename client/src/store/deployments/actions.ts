import { IDeployment } from "../../interfaces/IDeployment";
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from "../index";
import { API_ROOT } from "../../constants";
import { toast } from "react-toastify";

import {
  FETCHING_DEPLOYMENTS,
  LOAD_DEPLOYMENTS,
  FAILED_TO_FETCH_DEPLOYMENTS,
  ADDING_DEPLOYMENT,
  DEPLOYMENT_ADDED,
  DeploymentActionTypes,
  FAILED_TO_ADD_DEPLOYMENT,
  DELETING_DEPLOYMENT,
  DEPLOYMENT_DELETED,
  FAILED_TO_DELETE_DEPLOYMENT
} from "./types";


export const fetchDeployments = (): ThunkAction<void, RootState, unknown, Action<string>> => 
  async (dispatch) => {
    dispatch(fetchingDeployments());
    try {
      const response = await fetch(`${API_ROOT}/api/deployments`);
      const data = await response.json();
      dispatch(loadDeployments(data.deployments));
    } catch (e) {
      toast(e.message);
      dispatch(failedFetchingDeployments(e));
    }
  };


export const fetchingDeployments = () : DeploymentActionTypes => {
  return {
    type: FETCHING_DEPLOYMENTS,
  }
};

export const loadDeployments = (deployments: IDeployment[]) : DeploymentActionTypes => {
  return {
    type: LOAD_DEPLOYMENTS,
    deployments
  }
}

export const failedFetchingDeployments = (error: Error) : DeploymentActionTypes => {
  return {
    type: FAILED_TO_FETCH_DEPLOYMENTS,
    error
  }
}

export const addingDeployment = () : DeploymentActionTypes => {
  return {
    type: ADDING_DEPLOYMENT,
  }
};

export const deploymentAdded = (deployment: IDeployment) : DeploymentActionTypes => {
  return {
    type: DEPLOYMENT_ADDED,
    deployment
  }
}

export const failedToAddDeployment = () : DeploymentActionTypes => {
  return {
    type: FAILED_TO_ADD_DEPLOYMENT,
  }
}

export const deleteDeployment = (id: String): ThunkAction<void, RootState, unknown, Action<string>> => 
  async (dispatch) => {
    dispatch(deletingDeployment(id));
    try {
      const response = await fetch(`${API_ROOT}/api/deployments/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.status === "SUCCESS") {
        dispatch(deploymentDeleted());
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      toast(e.message);
      dispatch(failedToDeleteDeployment());
    }
  };

export const deletingDeployment = (deploymentId: String) : DeploymentActionTypes => {
  return {
    type: DELETING_DEPLOYMENT,
    deploymentId
  }
};

export const deploymentDeleted = () : DeploymentActionTypes => {
  return {
    type: DEPLOYMENT_DELETED,
  }
}

export const failedToDeleteDeployment = () : DeploymentActionTypes => {
  return {
    type: FAILED_TO_DELETE_DEPLOYMENT,
  }
}



