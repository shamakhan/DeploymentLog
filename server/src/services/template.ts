import TemplateModel from "../models/template";

export default class Template {
  all() {
    return TemplateModel.find();
  }
}