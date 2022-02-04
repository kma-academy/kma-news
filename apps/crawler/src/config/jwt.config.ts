import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_ttl: process.env.ACCESS_TOKEN_TTL,
}));
