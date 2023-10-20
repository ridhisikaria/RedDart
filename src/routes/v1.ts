import { Router } from "express";
import { UserController } from "../controllers/user";

const apiV1Router: Router = Router();

apiV1Router.get("/users/:address", UserController.get);
apiV1Router.post("/users", UserController.create);

export default apiV1Router;