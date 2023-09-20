import { Router } from "express";
import { injectable, inject } from "inversify";
import ProductController from "../controllers/product.controller";
import TYPES from "../types";
import BaseRouter from "./base.router";
import UserController from "../controllers/user.controller";
import { authenticateJwt } from "../middlewares/authentication.middleware";

@injectable()
export default class UserRouter extends BaseRouter {
  @inject(TYPES.UserController) userController: UserController;

  private initializeRoutes() {
    this.router.get('/users', this.getController(this.userController, 'getAll'));
    this.router.get("/user/profile", authenticateJwt, this.getController(this.userController, 'profile'));
    this.router.get("/user/:id", this.getController(this.userController, 'get'));
    this.router.post("/user/register", this.getController(this.userController, 'create'));
    this.router.post("/user/login", this.getController(this.userController, 'login'));
    this.router.post("/user/profile", authenticateJwt, this.getController(this.userController, 'updateProfile'));
  }

  public getRouter(): Router {
    this.initializeRoutes()
    return this.router;
  }
}
