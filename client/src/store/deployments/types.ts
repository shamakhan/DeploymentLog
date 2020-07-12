import { List, Map } from "immutable"
import { IDeployment } from "../../interfaces/IDeployment"

export const FETCH_DEPLOYMENTS = "app/deployments/FETCH_DEPLOYMENTS"
export const LOAD_DEPLOYMENTS = "app/deployments/LOAD_DEPLOYMENTS"
export const FAILED_TO_FETCH_DEPLOYMENTS =
  "app/deployments/FAILED_TO_FETCH_DEPLOYMENTS"

export const ADDING_DEPLOYMENT = "app/deployments/ADDING_DEPLOYMENT"
export const DEPLOYMENT_ADDED = "app/deployments/DEPLOYMENT_ADDED"
export const FAILED_TO_ADD_DEPLOYMENT =
  "app/deployments/FAILED_TO_ADD_DEPLOYMENT"

export const DELETING_DEPLOYMENT = "app/deployments/DELETING_DEPLOYMENT"
export const DEPLOYMENT_DELETED = "app/deployments/DEPLOYMENT_DELETED"
export const FAILED_TO_DELETE_DEPLOYMENT =
  "app/deployments/FAILED_TO_DELETE_DEPLOYMENT"

interface FetchDeploymentsAction {
  type: typeof FETCH_DEPLOYMENTS
}

interface LoadDeploymentsAction {
  type: typeof LOAD_DEPLOYMENTS
  deployments: IDeployment[]
}

interface FailedDeploymentsAction {
  type: typeof FAILED_TO_FETCH_DEPLOYMENTS
  error: Error
}
  
interface AddingDeployment {
  type: typeof ADDING_DEPLOYMENT
}

interface DeploymentAdded {
  type: typeof DEPLOYMENT_ADDED
  deployment: IDeployment
}

interface FailedToAddDeployment {
  type: typeof FAILED_TO_ADD_DEPLOYMENT
}

interface DeletingDeployment {
  type: typeof DELETING_DEPLOYMENT,
  deploymentId: String
}

interface DeploymentDeleted {
  type: typeof DEPLOYMENT_DELETED
}

interface FailedToDeleteDeployment {
  type: typeof FAILED_TO_DELETE_DEPLOYMENT
}

export type DeploymentActionTypes =
  | FetchDeploymentsAction
  | LoadDeploymentsAction
  | AddingDeployment
  | FailedDeploymentsAction
  | DeploymentAdded
  | FailedToAddDeployment
  | DeletingDeployment
  | DeploymentDeleted
  | FailedToDeleteDeployment

export interface DeploymentState extends Map<String, any> {
  list: List<IDeployment>,
  loading: Boolean,
  errors: String,
  adding: Boolean,
  deletingDeployment: String | null,
}
