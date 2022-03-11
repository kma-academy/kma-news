import Joi from "joi";

export const jwtValidation = {
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_TTL: Joi.number()
    .min(1)
    .max(10 * 60),
  REFRESH_TOKEN_SECRET: Joi.string()
    .invalid(Joi.ref('ACCESS_TOKEN_SECRET'))
    .required(),
  REFRESH_TOKEN_TTL: Joi.number()
    .min(24 * 60 * 60)
    .required(),
};
