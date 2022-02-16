import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { LoginResultInterface } from '../common/interfaces/login-result.interface';
import { User } from '../user/entities/user.entity';
import { LoginWithEmailDto } from './dto/login-with-email.dto';
import { Cookies } from '../common/decorators/cookie.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginWithEmailDto,
  })
  @HttpCode(200)
  login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { refresh_token, ...data } = req.user as LoginResultInterface;
    res.cookie('refresh_token', refresh_token, {
      domain: 'localhost',
      expires: new Date(data.expiredAt),
      httpOnly: true,
    });
    return data;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  profile(@CurrentUser() user: User) {
    return user;
  }

  @Post('refresh')
  @ApiCookieAuth('refresh_token')
  refresh(@Cookies('refresh_token') refresh_token: string) {
    return this.authService.refresh(refresh_token);
  }
}
