import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import TYPES from "../types";
import IUserService from "../interfaces/user.service.interface";
import { UserCreateDto } from "../dtos/user.dto";
import BaseController from "./base.controller";
import { BadRequestError, InternalError } from "../core/app.errors";

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
    };

    await this.userService.create(createUserDto);

    res.sendStatus(201);
  }

  public async update(_req: Request, _res: Response): Promise<void> {
    throw new Error("Method not implemented.");
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
}
