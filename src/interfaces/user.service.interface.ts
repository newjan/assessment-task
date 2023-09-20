import { UserCreateDto } from "../dtos/user.dto";
import { IUser } from "../models/user.model";

/**
 * Interface for the User Service.
 */
export default interface IUserService {
  /**
   * Create a new User.
   * @param data The User data to create.
   */
  create(data: UserCreateDto): Promise<void>;

  /**
   * Get a User by its ID.
   * @param id The ID of the User to retrieve.
   */
  get(id: string): Promise<IUser | null>;

  /**
   * Get all products.
   */
  getAll(): Promise<IUser[]>;

  login(email: string, password: string): Promise<string | null>;
}
