import { Container } from 'inversify';
import TYPES from '../types';
import ApplicationRouter from '../router';
import ProductController from '../controllers/product.controller';
import ProductRepository from '../repositories/product.repository';
import IProductService from '../interfaces/product.service.interface';
import ProductService from '../services/product.service';
import ProductRouter from '../routers/product.router';
// import UserRepository from '../user/user.repository';
// import UserService from '../user/user.service';
// import UserController from '../user/user.controller';
// import IUserService from '../user/user.service.interface';

const container = new Container({ defaultScope: 'Singleton' });
// Like other dependencies we do not resolve ApplicationRouter via `TYPES`.
// We get the instance of the class only in app.ts file during bootstrap.
container.bind(ApplicationRouter).to(ApplicationRouter);

container.bind<ProductRouter>(TYPES.ProductRouter).to(ProductRouter);
container.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<IProductService>(TYPES.ProductService).to(ProductService);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);

export default container;
