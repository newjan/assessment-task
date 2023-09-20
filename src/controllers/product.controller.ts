import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import TYPES from '../types';
import BaseController from './base.controller';
import IProductService from '../interfaces/product.service.interface';
import { ProductCreateDto } from '../dtos/product.dto';
import { NotFoundError } from '../core/app.errors';

@injectable()
export default class ProductController extends BaseController {
  @inject(TYPES.ProductService) private productService: IProductService; // Inject your product service

  public async getAll(_req: Request, res: Response): Promise<void> {
    const products = await this.productService.getAll();
    res.send(products);
  }

  public async get(req: Request, res: Response): Promise<void> {
    const product = await this.productService.get(req.params.id);

    if (!product) {
      res.status(404).send('Product not found');
      return;
    }

    res.send(product);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const createProductDto: ProductCreateDto = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      manufacturer: req.body.manufacturer,
      stockQuantity: req.body.stockQuantity,
    };

    await this.productService.create(createProductDto);
    res.sendStatus(201);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    const updateProductDto: Partial<ProductCreateDto> = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      manufacturer: req.body.manufacturer,
      stockQuantity: req.body.stockQuantity,
    };


    const updatedProduct = await this.productService.update(productId, updateProductDto);

    if (!updatedProduct) {
      throw new NotFoundError("Product not found")
    }

    res.send(updatedProduct);
  }
}
