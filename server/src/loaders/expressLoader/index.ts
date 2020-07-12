import path from "path";
import express, { Application, Request, Response, NextFunction } from "express";

import morgan from "morgan";
// import cors from "cors";
import helmet from "helmet";

import deploymentRouter from "../../api/deployments";
import templateRouter from "../../api/templates";

import customMiddlewares from "./middlewares";

export default async ({ app }: { app: Application }) => {
  // Register middlewares
  app.use(morgan('common'));
  // app.use(cors());
  app.use(express.json());
  app.use(helmet());
  
  app.use('/api/deployments', deploymentRouter);
  app.use('/api/templates', templateRouter);
  
  app.use(express.static(path.join(process.cwd(), 'client', 'build')));
  
  app.get('', (req: Request, res: Response) => {
    res.sendFile(path.resolve(process.cwd(), 'client', 'build', 'index.html'));
  });
  
  customMiddlewares({ app });
}

