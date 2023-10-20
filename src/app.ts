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

const app = express();
app.disable("x-powered-by");

// Apply cors settings
const corsOptions: cors.CorsOptions = {
  allowedHeaders: ["X-Forwarded-For", "Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "X-Timestamp", "X-Source", "ngsw-bypass", "Authorization", "X-Authorization-Secret", "X-Integrity"],
  exposedHeaders: ["X-Pagination", "X-Authentication"],
  credentials: true,
  methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: ["http://localhost:8001"],
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
  console.log(`App listening on port ${port} and host ${host}`);

  process.on("unhandledRejection", (reason, promise) => {
    console.log("unhandled rejection event", {
      reason: reason,
      promise: promise,
    });
  });

  scanSui();
  // await MongoDbConnectionManager.connectNoSqlDB();

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
