import { injectable, inject } from 'inversify';
import TYPES from '../types';
import ProductRepository from '../repositories/product.repository';
import IProductService from '../interfaces/product.service.interface';
import { IProduct } from '../models/product.model';
import { ProductCreateDto } from '../dtos/product.dto';

@injectable()
export default class ProductService implements IProductService {
  @inject(TYPES.ProductRepository) private _productRepository: ProductRepository; // Inject your product repository

  public async create(data: ProductCreateDto): Promise<void> {
    // Implement product creation logic here using the product repository
    // Validate and manipulate data as needed
    await this._productRepository.create(data);
  }

  public async get(id: string): Promise<IProduct | null> {
    // Implement product retrieval logic here using the product repository
    return this._productRepository.findById(id);
  }

  public async getAll(): Promise<IProduct[]> {
    // Implement logic to get all products using the product repository
    return this._productRepository.findAll();
  }

  public async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    const existingProduct = await this._productRepository.findById(id);
    if (!existingProduct) {
      return null;
    }

    const updatedProduct = await this._productRepository.update({ _id: id }, data);

    return updatedProduct;
  }

}
