import { Router } from "express";
import { UserController } from "../controllers/user";
import { EventController } from "../controllers/event";

const apiV1Router: Router = Router();

apiV1Router.get("/users/:address", UserController.get);
apiV1Router.post("/users", UserController.create);
apiV1Router.get("/events/:address", EventController.get);

export default apiV1Router;