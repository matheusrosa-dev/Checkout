import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '@nestjs/config';
import { IRedisConfig } from '../../config/interfaces/redis-config.interface';
import { RedisService } from './redis.service';

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
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
