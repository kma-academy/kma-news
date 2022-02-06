import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { TokenService } from '../../token/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: tokenService.access_token_secret,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any) {
    this.logger.debug('Validate user:' + payload.id);
    const user = await this.userService.findOne(payload.id);
    if (user?.email != payload.email) throw new UnauthorizedException();
    return user;
  }
}
