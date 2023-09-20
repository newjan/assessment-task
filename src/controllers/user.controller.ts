import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import TYPES from "../types";
import IUserService from "../interfaces/user.service.interface";
import { UserCreateDto, UserUpdateDto } from "../dtos/user.dto";
import BaseController from "./base.controller";
import { BadRequestError, InternalError } from "../core/app.errors";
import { IUser } from "../models/user.model";

@injectable()
export default class UserController extends BaseController {
  @inject(TYPES.UserService) private userService: IUserService;

  public async getAll(_req: Request, res: Response): Promise<void> {
    const response = await this.userService.getAll();
    res.send(response);
  }

  public async get(req: Request, res: Response): Promise<void> {
    const user = await this.userService.get(req.params.id);
    res.send(user);
  }

  /**
   * Create user
   *
   * @requires username An unique user name
   * @requires password A valid password
   * @requires email A valid email
   **/
  public async create(req: Request, res: Response) {
    const createUserDto: UserCreateDto = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address
    };

    await this.userService.create(createUserDto);

    res.sendStatus(201);
  }

  public async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const updateUserDto: UserUpdateDto = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
      };

      await this.userService.update(req.currentUser.id, updateUserDto);

      res.status(200).json({message: "Profile updated successfully"});
    } catch (error) {
      console.error(error);
      throw new InternalError("Internal Server Error")
    }
  }

  public async delete(_req: Request, _res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await this.userService.login(email, password);

    if (!token) {
      throw new BadRequestError("Invalid credentials");
    }

    res.json({ message: "Login successful", token });
  }

  public async profile(req: Request, res: Response) {
    try {
      const user: IUser = await this.userService.get(req.currentUser.id)
      res.json({ message: "Profile Details Fetched", user });
    } catch (error) {
      throw new InternalError("Something went wrong")
    }
  }
}
