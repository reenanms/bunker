import * as jwt from "jsonwebtoken";
import { UserToken } from "../entity/UserToken";
import { DeviceToken } from "../entity/DeviceToken";

type VerifyResult = {
  error: jwt.VerifyErrors | null;
  decoded: { username: string; deviceId: string } | undefined;
} | null;

export class AuthService {
  private privateKey: jwt.Secret;
  private algorithm: jwt.Algorithm;
  private expiresIn: string;

  constructor() {
    this.privateKey = process.env.TOKEN_PRIVATE_KEY!;
    this.algorithm = "HS256";
    this.expiresIn = `${process.env.TOKEN_EXPIRES_IN_HOURS}h`;
  }

  public async generateUserToken(username: string): Promise<UserToken> {
    const payload = { username };
    const options: jwt.SignOptions = {
      algorithm: this.algorithm,
      expiresIn: this.expiresIn,
    };
    const token = jwt.sign(payload, this.privateKey, options);
    return { username, token };
  }

  public async generateDeviceToken(
    username: string,
    deviceId: string,
  ): Promise<DeviceToken> {
    const payload = { username, deviceId };
    const options: jwt.SignOptions = {
      algorithm: this.algorithm,
    };

    const token = jwt.sign(payload, this.privateKey, options);
    return { username, token, deviceId };
  }

  public async getTokenPaylod(token: string): Promise<UserToken | DeviceToken> {
    let verifyResult: VerifyResult = null;

    await jwt.verify(
      token,
      this.privateKey,
      (error, decoded) => (verifyResult = { error, decoded: <any>decoded }),
    );

    if (verifyResult!.error != null) throw new Error("Invalid token");

    return {
      username: verifyResult!.decoded!.username,
      token,
      deviceId: verifyResult!.decoded!.deviceId,
    };
  }
}
