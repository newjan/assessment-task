import { Router } from "express";
import BaseController from "../controllers/base.controller";
import asyncWrap from "../core/asyncWrapper";
import { injectable } from "inversify";

@injectable()
export default abstract class BaseRouter {
    protected getController(context: BaseController, func: string) {
        return asyncWrap(context[func].bind(context));
    }
    protected router: Router;
    constructor() {
      this.router = Router();
    }

}