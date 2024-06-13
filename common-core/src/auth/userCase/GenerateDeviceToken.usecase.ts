import { UserRepository } from "../../user/repository/User.repository";
import { DeviceLogin } from "../entity/DeviceLogin";
import { DeviceToken } from "../entity/DeviceToken";
import { AuthService } from "../service/AuthService";

export class GenerateDeviceTokenUseCase {
  constructor(readonly repository: UserRepository) { }

  public async run(login: DeviceLogin): Promise<DeviceToken> {
    const service = new AuthService();
    const userToken = await service.generateDeviceToken(login.username, login.deviceId);
    return userToken;
  }
}
