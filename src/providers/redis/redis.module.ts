import { Global, Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '@nestjs/config';
import { IRedisConfig } from '../../config/interfaces';
import { RedisService } from './redis.service';
import { AuthTokensService } from './auth-tokens.service';

@Global()
@Module({
  imports: [
    NestRedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redis = configService.get('redis') as IRedisConfig;

        return {
          type: 'single',
          url: `redis://${redis.host}:${redis.port}`,
        };
      },
    }),
  ],
  providers: [RedisService, AuthTokensService],
  exports: [RedisService, AuthTokensService],
})
export class RedisModule {}
