import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokensService } from '../tokens.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

    const refreshToken = authHeader.split(' ')[1];

    const userId =
      await this.tokensService.findUserIdByRefreshToken(refreshToken);

    if (!userId) return false;

    req.userId = userId;

    return true;
  }
}
