import Joi from "joi";

export const elasticSearchValidateSchema = {
  ELASTICSEARCH_URL: Joi.string().required()
}
