import { injectable, inject } from "inversify";
import bcrypt from "bcrypt";
import TYPES from "../types";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import jwt from 'jsonwebtoken';
import UserRepository from "../repositories/user.repository";
import IUserService from "../interfaces/user.service.interface";
import { UserCreateDto } from "../dtos/user.dto";
import { BadRequestError, MissingFieldError } from "../core/app.errors";
import Constants from "../core/constants";
import { IUser } from "../models/user.model";

@injectable()
export default class UserService implements IUserService {
  @inject(TYPES.UserRepository) private _userRepository: UserRepository;

  public normalizeEmail(email: string): string {
    return email.toLowerCase();
  }

  //#region Utility methods
  private async isValidUsername(username: string): Promise<boolean> {
    const length = username.length;
    const validLength = length >= 4 && length <= 30;

    if (!validLength) {
      return false;
    }

    const isAvailable = await this.isUsernameAvailable(username);

    return isAvailable;
  }

  private async isUsernameAvailable(username: string): Promise<boolean> {
    const isExists = await this._userRepository.isUsernameExists(username);

    return isExists;
  }

  private async hashPassword(password: string): Promise<string> {
    const normalizePassword = password.trim();
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(normalizePassword, salt);
    return hash;
  }

  private generateJwtToken(user: IUser): string {
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return token;
  }
  //#endregion

  public async create(data: UserCreateDto): Promise<void> {
    if (!data.email) {
      throw new MissingFieldError("email");
    }

    if (!data.username) {
      throw new MissingFieldError("username");
    }

    if (!data.password) {
      throw new MissingFieldError("password");
    }

    if (!isEmail(data.email)) {
      throw new BadRequestError(Constants.INVALID_EMAIL);
    }

    if (!isLength(data.password.trim(), { min: 4, max: 20 })) {
      throw new BadRequestError(Constants.INVALID_PASSWORD);
    }

    const normalizedEmail = this.normalizeEmail(data.email);

    this.isValidUsername(data.username);

    const users = await this._userRepository.find({
      $or: [{ username: data.username }, { email: normalizedEmail }],
    });

    users.forEach((user) => {
      if (user.email === normalizedEmail) {
        throw new BadRequestError(Constants.EMAIL_NOT_AVAILABLE);
      }

      if (user.username === data.username) {
        throw new BadRequestError(Constants.USERNAME_NOT_AVAILABLE);
      }
    });

    const password = await this.hashPassword(data.password);

    const userData: UserCreateDto = {
      username: data.username,
      email: normalizedEmail,
      password,
    };

    await this._userRepository.create(userData);
  }

  public async get(id: string): Promise<IUser> {
    if (!id) {
      throw new MissingFieldError("id");
    }

    const user = await this._userRepository.findById(id);
    return user;
  }

  public async getAll(): Promise<IUser[]> {
    const documents = await this._userRepository.findAll();

    return documents;
  }

  public async login(email: string, password: string): Promise<string | null> {
    if (!email) {
      throw new MissingFieldError("email");
    }

    if (!password) {
      throw new MissingFieldError("password");
    }

    if (!isEmail(email)) {
      throw new BadRequestError(Constants.INVALID_EMAIL);
    }

    const user = await this._userRepository.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = this.generateJwtToken(user);
    return token;
  }
}
