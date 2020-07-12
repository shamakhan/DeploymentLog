import { IDeployment } from "../../interfaces/IDeployment";

import {
  FETCH_DEPLOYMENTS,
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

export const fetchDeployments = () : DeploymentActionTypes => {
  return {
    type: FETCH_DEPLOYMENTS,
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



