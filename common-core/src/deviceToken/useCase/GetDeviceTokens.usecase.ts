import { DeviceTokenRepository } from "../repository/DeviceToken.repository";


export class GetDeviceTokensUseCase {
  constructor(readonly repository: DeviceTokenRepository) { }

  public async run(deviceId: string): Promise<string[]> {
    const modelDeviceTokens = await this.repository.readFilter({
      deviceId,
      isValid: true
    });
    const tokens = modelDeviceTokens.map(e => e.token);
    return tokens;
  }
}
