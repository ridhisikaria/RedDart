require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import * as types from "./types";
import * as utils from "./utils";

import routes from "./routes";

// import { handleError } from "./middlewares";
// import MongoDbConnectionManager from "./database/models/mongodb";
import { ResponseHelper } from "./utils/responseHelper";
import client from "./scanner";
import { UserRepository } from "./database/repositories/user";
import scanSui from "./scanner";

const models = require("./database/models");

const app = express();
app.disable("x-powered-by");

const path = require('path');


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../reddart.html'));
});

// Apply cors settings
const corsOptions: cors.CorsOptions = {
  allowedHeaders: ["X-Forwarded-For","Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "X-Timestamp", "X-Source", "ngsw-bypass", "Authorization", "X-Authorization-Secret", "X-Integrity"],
  exposedHeaders: ["X-Pagination", "X-Authentication"],
  credentials: true,
  methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: ["*"],
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

morgan.token("c-ip", (req: types.ExpressRequest): string => utils.Common.parseIpAddress(req));
app.use(
  morgan(":c-ip - :date - :method - :url - HTTP/:http-version - :status - :res[content-length] - :response-time ms")
);

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(routes);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.options("*", cors(corsOptions));

// Resource not found error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  ResponseHelper.respondError(res, req, new Error("error"));
});

// Default error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use(handleError);

const port = process.env.PORT as string;
const host = process.env.HOST as string;

const gracefullShutdown = async () => {
  process.exit(0);
};

app.listen(parseInt(port), host, async () => {
  process.on("unhandledRejection", (reason, promise) => {
    console.log("unhandled rejection event", {
      reason: reason,
      promise: promise,
    });
  });

  models.reddartDb.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error: any) => {
    console.error('Unable to connect to the database: ', error);
 });

  scanSui();
  // await MongoDbConnectionManager.connectNoSqlDB();

  console.log(`App listening on port ${port} and host ${host}`);
  process.on("SIGTERM", gracefullShutdown);
  process.on("SIGINT", gracefullShutdown);
  process.on("SIGHUP", gracefullShutdown);
});

const trapGlobalException = (err: Error) => {
  console.error("Global Exception event", {
    error: err
  });
};

process.on("uncaughtException", trapGlobalException);
process.on("unhandledRejection", trapGlobalException);


export default app;
