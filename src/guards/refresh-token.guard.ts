import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthTokensService } from '../providers/redis/auth-tokens.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly authTokensService: AuthTokensService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const refreshToken = req?.cookies?.refresh_token as string | undefined;

    if (!refreshToken) return false;

    const userId =
      await this.authTokensService.findUserIdByRefreshToken(refreshToken);

    if (!userId) return false;

    req.userId = userId;

    return true;
  }
}
