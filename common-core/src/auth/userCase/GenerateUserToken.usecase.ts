import { UserRepository } from "../../user/repository/User.repository";
import { UserLogin } from "../entity/UserLogin";
import { UserToken } from "../entity/UserToken";
import { AuthService } from "../service/AuthService";

export class GenerateUserTokenUseCase {
  constructor(readonly repository: UserRepository) { }

  public async run(login: UserLogin): Promise<UserToken> {
    const username = login.username;
    const user = await this.repository.read({ username });
    if (user.password != login.password)
      throw new Error("invalid user or password");

    const service = new AuthService();
    const userToken = await service.generateUserToken(login.username);
    return userToken;
  }
}
