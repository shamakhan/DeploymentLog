import mongoose from "mongoose";
import config from "../config";

export default async () => {
  mongoose.connect(config.app.database, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('connected', () => {
    console.log(`Connected to DB at ${config.app.database}`);
  });
  mongoose.connection.on('error', (err) => {
    console.log(`Failed connecting to DB`, err);
  });
}
