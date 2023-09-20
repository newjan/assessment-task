import { Container } from 'inversify';
import TYPES from '../types';
import ApplicationRouter from '../router';
import ProductController from '../controllers/product.controller';
import ProductRepository from '../repositories/product.repository';
import IProductService from '../interfaces/product.service.interface';
import ProductService from '../services/product.service';
import ProductRouter from '../routers/product.router';
import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.service';
import IUserService from '../interfaces/user.service.interface';
import UserController from '../controllers/user.controller';
import UserRouter from '../routers/user.router';

const container = new Container({ defaultScope: 'Singleton' });
// Like other dependencies we do not resolve ApplicationRouter via `TYPES`.
// We get the instance of the class only in app.ts file during bootstrap.
container.bind(ApplicationRouter).to(ApplicationRouter);

container.bind<ProductRouter>(TYPES.ProductRouter).to(ProductRouter);
container.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<IProductService>(TYPES.ProductService).to(ProductService);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserRouter>(TYPES.UserRouter).to(UserRouter);



export default container;
