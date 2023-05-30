import jwt from 'jsonwebtoken';


export type Auth = {
  username: string;
  token: string;
};

export class AuthService {
  private privateKey: jwt.Secret;
  private options: jwt.SignOptions;

  constructor() {
    this.privateKey = process.env.TOKEN_PRIVATE_KEY!;
    this.options = {
      algorithm: "HS256",
      expiresIn: `${process.env.TOKEN_EXPIRES_IN_HOURS}h`
    };
  }

  public async generateToken(username: string): Promise<Auth> {
    const payload = { username };
    const token = jwt.sign(payload, this.privateKey, this.options);
    return { username, token };
  }

  public async getTokenPaylod(token: string): Promise<Auth | null> {
    type VerifyResult = {
      error: jwt.VerifyErrors | null;
      decoded: { username: string; } | undefined;
    } | null;

    let verifyResult: VerifyResult = null;
    await jwt.verify(token, this.privateKey, (error, decoded) => verifyResult = { error, decoded: <any>decoded });

    if (verifyResult!.error != null)
      throw new Error("Invalid auth");

    return {
      username: verifyResult!.decoded!.username,
      token
    };
  }
}
