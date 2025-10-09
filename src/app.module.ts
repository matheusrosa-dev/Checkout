import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './providers/postgres/postgres.module';
import { AuthModule, UsersModule } from './app/';
import { RedisModule } from './providers/redis/redis.module';

@Module({
  imports: [ConfigModule, PostgresModule, RedisModule, UsersModule, AuthModule],
})
export class AppModule {}
