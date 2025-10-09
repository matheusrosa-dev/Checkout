import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './providers/database/postgres.module';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [ConfigModule, PostgresModule, AuthModule, UsersModule],
})
export class AppModule {}
