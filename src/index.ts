import * as config from "config";
import { App } from "./app";
import mongoose = require("mongoose");

const port: number = config.get("appConfig.port");

const dbPort: number = config.get("dbConfig.port");
const dbHost: string = config.get("dbConfig.host");
const dbName: string = config.get("dbConfig.name");
const dbConnectionString: string = `mongodb://${dbHost}:${dbPort}/${dbName}`;

// Mongoose Setup
mongoose.Promise = global.Promise;

// Instantiate and run App
const app: App = new App();
app.run(port, dbConnectionString);

// Export the app for testing
export default app;
