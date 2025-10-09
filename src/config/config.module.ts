import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { apiConfig, databaseConfig, validationSchema } from './config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [apiConfig, databaseConfig],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
