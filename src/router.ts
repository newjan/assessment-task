import { Application } from 'express';
import { injectable, inject } from 'inversify';
import asyncWrap from './core/asyncWrapper';
import TYPES from './types';
import BaseController from './controllers/base.controller';
import ProductRouter from './routers/product.router';
import UserRouter from './routers/user.router';

@injectable()
export default class ApplicationRouter {
  @inject(TYPES.ProductRouter) private productRouter: ProductRouter;
  @inject(TYPES.UserRouter) private userRouter: UserRouter;

  public register(app: Application) {

    app.use('/v1', this.productRouter.getRouter());
    app.use('/v1', this.userRouter.getRouter());

  }
}
