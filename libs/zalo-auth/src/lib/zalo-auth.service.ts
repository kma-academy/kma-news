import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ZaloService {
  private readonly logger = new Logger(ZaloService.name);
  constructor(
    private readonly httpService: HttpService,
    @Inject('ZALO_SECRET') private readonly secret: string,
    @Inject('ZALO_APPID') private readonly appId: string
  ) {
    console.log(secret, appId);
  }
  async getTokenFromAuthorizationCode(code: string) {
    this.logger.log(code);
    const { data } = await firstValueFrom(
      this.httpService.request({
        method: 'POST',
        url: 'https://oauth.zaloapp.com/v4/access_token',
        headers: {
          secret_key: this.secret,
        },
        data: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          app_id: this.appId,
        }).toString(),
      })
    );
    return data as Record<'access_token' | 'refresh_token', string>;
  }

  async getUserDataFromToken(token: string) {
    const { data } = await firstValueFrom(
      this.httpService.request({
        url: 'https://graph.zalo.me/v2.0/me?fields=id,name,picture.type(large)',
        headers: {
          access_token: token,
          secret_key: this.secret,
        },
      })
    );
    return data as {
      id: string;
      name: string;
      picture?: {
        data?: {
          url?: string;
        };
      };
    };
  }
}
