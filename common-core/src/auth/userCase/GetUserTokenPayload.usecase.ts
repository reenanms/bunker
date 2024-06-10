import { DeviceToken } from "../entity/DeviceToken";
import { UserToken } from "../entity/UserToken";
import { AuthService } from "../service/AuthService";

export class GetUserTokenPayloadUseCase {
  constructor() { }

  public async run(token: string): Promise<UserToken | DeviceToken> {
    const service = new AuthService();
    const payload = await service.getTokenPaylod(token);
    return payload;
  }
}
