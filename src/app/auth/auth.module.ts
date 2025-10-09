import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../../providers/redis/redis.module';
import { TokensService } from './tokens.service';

@Module({
  imports: [UsersModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService, TokensService],
})
export class AuthModule {}
