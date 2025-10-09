import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokensService } from '../tokens.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

    const accessToken = authHeader.split(' ')[1];

    const session =
      await this.tokensService.findSessionByAccessToken(accessToken);

    if (!session) return false;

    req.session = session;

    return true;
  }
}
