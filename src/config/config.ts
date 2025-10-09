import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import 'dotenv/config';

export const apiConfig = registerAs('api', () => ({
  port: Number(process.env.API_PORT),
}));

export const databaseConfig = registerAs('database', () => ({
  port: Number(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
}));

export const validationSchema = Joi.object({
  API_PORT: Joi.number().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
