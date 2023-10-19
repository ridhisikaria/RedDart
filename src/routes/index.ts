import * as express from "express";
import apiV1Router from "./v1";


const baseRouter: express.Router = express.Router();
baseRouter.get("/", function (req, res) {
  return res.status(200).json({
    "message": "Served from reddart service",
    "status": 200,
    "code": 200
  });
});

baseRouter.get("/health-check", function (req, res) {
  return res.status(200).json({
    "message": "Served from red dart service",
    "status": 200,
    "code": 200
  });
});

baseRouter.use("/api/v1", apiV1Router);

export default baseRouter;