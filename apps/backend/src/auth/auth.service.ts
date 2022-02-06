import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return undefined;
    const { password: hashPassword, ...data } = user;
    if (this.userService.comparePassword(password, hashPassword)) return data;
    return undefined;
  }

  login(user: Pick<User, 'id' | 'email' | 'avatarURL' | 'name' | 'role'>) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    const access_token = this.tokenService.signAccessToken(payload);
    return {
      access_token: access_token,
      user: {
        id: user.id,
        email: user.email,
        avatarURL: user.avatarURL,
        name: user.name,
        role: user.role,
      },
    };
  }
}
