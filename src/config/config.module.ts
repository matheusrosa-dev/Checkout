import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { apiConfig, validationSchema } from './config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
