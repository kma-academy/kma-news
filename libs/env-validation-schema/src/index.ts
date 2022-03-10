import Joi from 'joi';
import { databaseValidation } from './database';
import { elasticSearchValidateSchema } from './elasticsearch';
import { jwtValidation } from './jwt';
export const EnvValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  ...databaseValidation,
  ...jwtValidation,
  ZALO_SECRET_KEY: Joi.string().required(),
  ZALO_APP_ID: Joi.string().required(),
  COOKIE_DOMAIN: Joi.string().required(),
  BACKEND_PORT: Joi.number().required(),
  FRONTEND_PORT: Joi.number().required(),
  ADMIN_PORT: Joi.number().required(),
  ADMIN_HOST: Joi.string().required(),
  FRONTEND_HOST: Joi.string().required(),
  BACKEND_HOST: Joi.string().required(),
  ...elasticSearchValidateSchema
});
