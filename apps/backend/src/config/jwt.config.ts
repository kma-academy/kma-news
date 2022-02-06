import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_ttl: +process.env.ACCESS_TOKEN_TTL,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_ttl: +process.env.REFRESH_TOKEN_TTL,
}));
