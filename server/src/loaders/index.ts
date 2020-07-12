import { Application } from "express";
import expressLoader from "./expressLoader";
import mongooseLoader from "./mongooseLoader";

export default async ({ expressApp }: { expressApp: Application }) => {
  await mongooseLoader();
  console.log("Database connected!");

  await expressLoader({ app: expressApp });
  console.log("Express Initialized");
}