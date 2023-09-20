import BaseRepository from './base.repository';
import { IUser, UserModel } from '../models/user.model';

// Import the BaseRepository

// Create a UserRepository by extending BaseRepository
export default class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  public async findByUsername(username: string): Promise<IUser | null> {
    return this.findOne({ username });
  }

  public async isUsernameExists(username: string): Promise<boolean> {
    const users = await this.find({ username }, { projection: { _id: 1 } });
    if (users.length > 0) {
      return true;
    }

    return false;
  }

  public async isEmailExists(email: string): Promise<boolean> {
    const users = await this.find({ email }, { projection: { _id: 1 } });
    if (users.length > 0) {
      return true;
    }

    return false;
  }

}
