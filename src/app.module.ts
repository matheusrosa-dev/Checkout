import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './providers/postgres/postgres.module';
import { AuthModule, UsersModule, BooksModule, MeModule } from './app';
import { RedisModule } from './providers/redis/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard, RolesGuard } from './guards';

@Module({
  imports: [
    ConfigModule,
    PostgresModule,
    RedisModule,
    UsersModule,
    AuthModule,
    BooksModule,
    MeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
