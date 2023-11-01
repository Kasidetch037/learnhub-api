import { RequestHandler } from "express";
import { IUserHandler } from ".";
import { IErrorDto } from "../dto/error";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { IUserRepository } from "../repositories";
import { hashPassword } from "../utils/bcrypt";

export default class UserHandler implements IUserHandler {
  private repo: IUserRepository;

  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  public registration: RequestHandler<
    {},
    IUserDto | IErrorDto,
    ICreateUserDto
  > = async (req, res) => {
    const { name, username, password: plainPassword } = req.body;

    const {
      id: registeredId,
      name: registeredName,
      registeredAt,
      username: registeredUsername,
    } = await this.repo.create({
      name,
      username,
      password: hashPassword(plainPassword),
    });

    return res
      .status(201)
      .json({
        id: registeredId,
        name: registeredName,
        registeredAt: `${registeredAt}`,
        username: registeredUsername,
      })
      .end();
  };
}
