import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from "@nestjs/common";
import * as resolver from "common-core/resolver";
import { CreateUserUseCase } from "common-core/user/useCase/CreateUser.usecase";
import { GetUserUseCase } from "common-core/user/useCase/GetUser.usecase";
import { User } from "common-core/user/entity/User";
import { AuthGuard } from "../auth.guard";

@Controller("/user")
export class UserController {
  constructor() {}

  @Post("/")
  async createUser(@Body() user: User) {
    const userCase = resolver.resolve(CreateUserUseCase);
    await userCase.run(user);
  }

  @UseGuards(AuthGuard)
  @Get("/")
  async getUser(@Request() request): Promise<User> {
    const username = request.auth.username;
    const userCase = resolver.resolve(GetUserUseCase);
    const result = await userCase.run({ username });
    return result;
  }
}
