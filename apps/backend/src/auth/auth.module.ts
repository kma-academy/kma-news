import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TokenModule } from './../token/token.module';
import { ZaloModule } from '@kma-news/zalo-auth';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TokenModule,
    ZaloModule.register({
      appId: process.env.ZALO_APP_ID,
      secret: process.env.ZALO_SECRET_KEY,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
