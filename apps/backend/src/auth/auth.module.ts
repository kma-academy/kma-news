import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: {},
    }),
    ConfigModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
