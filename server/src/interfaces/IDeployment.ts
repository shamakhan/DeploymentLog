export interface IDeployment {
  _id: String,
  url: String,
  templateName: String,
  version: String
}

export interface IDeploymentInput {
  url: String,
  templateName: String,
  version: String
}