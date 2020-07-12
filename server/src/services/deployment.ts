import DeploymentModel from "../models/deployment";
import { IDeploymentInput } from "../interfaces/IDeployment";

export default class Deployment {
  all() {
    return DeploymentModel.find();
  }

  add(payload: IDeploymentInput) {
    return DeploymentModel.create(payload);
  }

  async delete(id: String) {
    const deleted = await DeploymentModel.deleteOne({_id: id});
    return deleted.deletedCount;
  }
}