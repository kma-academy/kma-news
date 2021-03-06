import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  signAccessToken<T extends object>(payload: T): [string, Date] {
    const tokenExpiration = moment()
      .add(this.access_token_ttl, 'seconds')
      .toDate();
    const token = this.jwtService.sign(payload, {
      secret: this.access_token_secret,
      expiresIn: this.access_token_ttl,
    });
    return [token, tokenExpiration];
  }

  signRefreshToken<T extends object>(payload: T): [string, Date] {
    const tokenExpiration = moment()
      .add(this.refresh_token_ttl, 'seconds')
      .toDate();
    const token = this.jwtService.sign(payload, {
      secret: this.refresh_token_secret,
      expiresIn: this.refresh_token_ttl,
    });
    return [token, tokenExpiration];
  }

  verifyRefreshToken(token: string) {
    const { id, email } = this.jwtService.verify(token, {
      secret: this.refresh_token_secret,
    });
    return { id, email } as {
      id: number;
      email: string;
    };
  }

  get access_token_secret(): string {
    return this.configService.get<string>('jwt.access_token_secret');
  }

  get access_token_ttl(): number {
    return +this.configService.get<number>('jwt.access_token_ttl');
  }

  get refresh_token_secret(): string {
    return this.configService.get<string>('jwt.refresh_token_secret');
  }

  get refresh_token_ttl(): number {
    return +this.configService.get<number>('jwt.refresh_token_ttl');
  }
}
