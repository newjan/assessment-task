import BaseRepository from './base.repository';
import { IUser, UserModel } from '../models/user.model';

// Import the BaseRepository

// Create a UserRepository by extending BaseRepository
export default class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  public async findByUsername(username: string): Promise<IUser | null> {
    return this.model.findOne({ username });
  }

}
