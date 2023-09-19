import { ProductCreateDto } from '../dtos/product.dto';
import { IProduct } from '../models/product.model';

/**
 * Interface for the Product Service.
 */
export default interface IProductService {
  /**
   * Create a new product.
   * @param data The product data to create.
   */
  create(data: ProductCreateDto): Promise<void>;

  /**
   * Get a product by its ID.
   * @param id The ID of the product to retrieve.
   */
  get(id: string): Promise<IProduct | null>;

  /**
   * Get all products.
   */
  getAll(): Promise<IProduct[]>;
}
