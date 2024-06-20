import { DeviceTokenRepository } from "../../deviceToken/repository/DeviceToken.repository";
import { UserRepository } from "../../user/repository/User.repository";
import { DeviceLogin } from "../entity/DeviceLogin";
import { DeviceToken } from "../entity/DeviceToken";
import { AuthService } from "../service/AuthService";
import model from "../../SQL/prisma/client";

export class GenerateDeviceTokenUseCase {
  constructor(readonly userRepository: UserRepository,
              readonly deviceTokenRepository: DeviceTokenRepository) { }

  public async run(login: DeviceLogin): Promise<DeviceToken> {
    const service = new AuthService();
    const token = await service.generateDeviceToken(login.username, login.deviceId);
    const deviceToken: model.DeviceToken = {
      id: undefined,
      datetime: undefined,
      isValid: undefined,
      token: token.token,
      deviceId: token.deviceId
    };
    await this.deviceTokenRepository.create(deviceToken);
    
    return token;
  }
}
