import express from "express";
import sequelize, { Sequelize } from "sequelize";

export type Express = express.Express;
export type ExpressRequest = express.Request;
export type ExpressResponse = express.Response;
export type ExpressNextFunction = express.NextFunction;

export type SequelizeInstance = Sequelize;
export type SequelizeModel = typeof sequelize.Model;