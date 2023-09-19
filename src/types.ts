/**
import ProductRepository from './repositories/product.repository';
import ProductController from './controllers/product.controller';
import ProductService from './services/product.service';
import ProductRouter from './routers/product.router';
 * InversifyJS need to use the type as identifiers at runtime.
 * We use symbols as identifiers but you can also use classes and or string literals.
 */
export default {
    ProductRepository: Symbol('ProductRepository'),
    ProductController: Symbol('ProductController'),
    ProductService: Symbol('ProductService'),
    ProductRouter: Symbol('ProductRouter')
};
