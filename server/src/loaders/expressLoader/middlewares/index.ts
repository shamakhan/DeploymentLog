import { Application } from "express";
import errorHandlers from "./errorHandlers";

export default ({ app }: { app: Application }) => {
  errorHandlers({ app });
}