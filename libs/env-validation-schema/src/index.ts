import Joi from 'joi';
export const EnvValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().allow('').required(),
  DATABASE_NAME: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_TTL: Joi.number()
    .min(1)
    .max(10 * 60),
  REFRESH_TOKEN_SECRET: Joi.string()
    // .invalid(Joi.ref('ACCESS_TOKEN_SECRET'))
    .required(),
  REFRESH_TOKEN_TTL: Joi.number()
    .min(24 * 60 * 60)
    .required(),
});
