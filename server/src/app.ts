import express, { Application } from "express";
import loaders from "./loaders";
import config from "./config";

async function setupServer() {
  const app: Application = express();
  await loaders({ expressApp: app });

  app.listen(config.app.port, () => {
    console.log(`App running at ${config.app.url}`);
  })
}

setupServer();