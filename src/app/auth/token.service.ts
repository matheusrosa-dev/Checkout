import { Injectable } from '@nestjs/common';
import { RedisService } from '../../providers/redis/redis.service';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(private redisService: RedisService) {}

  async generateOpaqueTokens(userId: string) {
    const accessToken = crypto.randomBytes(32).toString('hex');
    const refreshToken = crypto.randomBytes(32).toString('hex');

    await this.setTokensInRedis({
      accessToken,
      refreshToken,
      userId,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async setTokensInRedis(props: {
    userId: string;
    accessToken: string;
    refreshToken: string;
  }) {
    const { userId, accessToken, refreshToken } = props;

    const fifteenMinutes = 15 * 60;
    const oneWeek = 7 * 24 * 60 * 60;

    await Promise.all([
      // Access Token
      this.redisService.set(
        `accessToken:${accessToken}`,
        userId,
        fifteenMinutes,
      ),
      this.redisService.set(
        `userId:${userId}:accessToken`,
        accessToken,
        fifteenMinutes,
      ),

      // Refresh Token
      this.redisService.set(`refreshToken:${refreshToken}`, userId, oneWeek),
      this.redisService.set(
        `userId:${userId}:refreshToken`,
        refreshToken,
        oneWeek,
      ),
    ]);
  }
}
