import { Application } from 'express';
import { injectable, inject } from 'inversify';
import asyncWrap from './core/asyncWrapper';
// import UserController from './user/user.controller';
import TYPES from './types';
import BaseController from './controllers/base.controller';
import ProductController from './controllers/product.controller';
import ProductRouter from './routers/product.router';

@injectable()
export default class ApplicationRouter {
  @inject(TYPES.ProductRouter) private productRouter: ProductRouter;

  // We need to bind proper context to the controller methods
  private getController(context: BaseController, func: string) {
    return asyncWrap(context[func].bind(context));
  }

  public register(app: Application) {

    app.use('/api', this.productRouter.getRouter());
    app.get('/', (req, res) => {
      res.send(200)
    });
    // app.get('/users/:id', this.getController(this.userController, 'get'));
    // app.post('/users', this.getController(this.userController, 'create'));
  }
}
