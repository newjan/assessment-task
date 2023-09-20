import { Router } from "express";
import { injectable, inject } from "inversify";
import ProductController from "../controllers/product.controller";
import TYPES from "../types";
import BaseRouter from "./base.router";

@injectable()
export default class ProductRouter extends BaseRouter {
  @inject(TYPES.ProductController) productController: ProductController;

  private initializeRoutes() {
    this.router.get('/products', this.getController(this.productController, 'getAll'));
    this.router.get("/products/:id", this.getController(this.productController, 'get'));
    this.router.post("/products", this.getController(this.productController, 'create'));
  }

  public getRouter(): Router {
    this.initializeRoutes()
    return this.router;
  }
}
