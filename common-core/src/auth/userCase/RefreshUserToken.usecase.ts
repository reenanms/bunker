import { DeviceToken } from "../entity/DeviceToken";
import { UserToken } from "../entity/UserToken";
import { AuthService } from "../service/AuthService";

export class RefreshUserTokenUseCase {
  constructor() { }

  public async run(token: string): Promise<UserToken> {
    const service = new AuthService();
    const payload = await service.getTokenPaylod(token);
    const userToken = await service.generateUserToken(payload.username);
    return userToken;
  }
}
