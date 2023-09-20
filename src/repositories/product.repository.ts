import { IProduct, ProductModel } from '../models/product.model';
import BaseRepository from './base.repository';


// Create a ProductRepository by extending BaseRepository
export default class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(ProductModel);
  }

  public async findByCategory(category: string): Promise<IProduct[]> {
    return this.find({ category });
  }

}
