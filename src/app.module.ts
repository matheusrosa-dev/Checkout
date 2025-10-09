import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './providers/postgres/postgres.module';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { RedisModule } from './providers/redis/redis.module';

@Module({
  imports: [ConfigModule, PostgresModule, RedisModule, AuthModule, UsersModule],
})
export class AppModule {}
