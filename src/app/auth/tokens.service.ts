import { Injectable } from '@nestjs/common';
import { RedisService } from '../../providers/redis/redis.service';
import * as crypto from 'crypto';
import { ISession } from './types';

@Injectable()
export class TokensService {
  constructor(private redisService: RedisService) {}

  async generateOpaqueTokens(session: ISession) {
    const accessToken = crypto.randomBytes(32).toString('hex');
    const refreshToken = crypto.randomBytes(32).toString('hex');

    await this.revokeTokensByUserId(session.userId);

    await this.setTokensInRedis({
      accessToken,
      refreshToken,
      session,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async findSessionByAccessToken(accessToken: string) {
    const session = await this.redisService.get(`accessToken:${accessToken}`);

    if (!session) return null;

    return JSON.parse(session) as ISession;
  }

  private async revokeTokensByUserId(userId: string) {
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
    session: ISession;
    accessToken: string;
    refreshToken: string;
  }) {
    const { session, accessToken, refreshToken } = props;

    const fifteenMinutes = 15 * 60;
    const oneWeek = 7 * 24 * 60 * 60;

    const stringifiedSession = JSON.stringify(session);

    await Promise.all([
      // Access Token
      this.redisService.set(
        `accessToken:${accessToken}`,
        stringifiedSession,
        fifteenMinutes,
      ),
      this.redisService.set(
        `userId:${session.userId}:accessToken`,
        accessToken,
        fifteenMinutes,
      ),

      // Refresh Token
      this.redisService.set(
        `refreshToken:${refreshToken}`,
        stringifiedSession,
        oneWeek,
      ),
      this.redisService.set(
        `userId:${session.userId}:refreshToken`,
        refreshToken,
        oneWeek,
      ),
    ]);
  }
}
