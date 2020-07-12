import { Application, Request, Response, NextFunction } from "express";
import config from "../../../config";

export default ({ app }: { app: Application }) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });
  
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.json({
      status: "FAILURE",
      message: error.message || "Something went wrong",
      stack: config.app.env === 'production' ? null : error.stack
    })
  })
}