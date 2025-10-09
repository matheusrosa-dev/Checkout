import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import {
  apiConfig,
  databaseConfig,
  redisConfig,
  validationSchema,
} from './config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [apiConfig, databaseConfig, redisConfig],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
