import { Injectable } from '@nestjs/common';
import { RedisService } from '../../providers/redis/redis.service';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(private redisService: RedisService) {}

  async generateOpaqueTokens(userId: string) {
    const accessToken = crypto.randomBytes(32).toString('hex');
    const refreshToken = crypto.randomBytes(32).toString('hex');

    await this.revokeTokensByUserId(userId);

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

  async revokeTokensByUserId(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.redisService.get(`userId:${userId}:accessToken`),
      this.redisService.get(`userId:${userId}:refreshToken`),
    ]);

    if (accessToken) {
      await Promise.all([
        this.redisService.delete(`accessToken:${accessToken}`),
        this.redisService.delete(`userId:${userId}:accessToken`),
      ]);
    }

    if (refreshToken) {
      await Promise.all([
        this.redisService.delete(`refreshToken:${refreshToken}`),
        this.redisService.delete(`userId:${userId}:refreshToken`),
      ]);
    }
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
