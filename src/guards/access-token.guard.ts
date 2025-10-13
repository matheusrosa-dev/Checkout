import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthTokensService } from '../providers/redis/auth-tokens.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly authTokensService: AuthTokensService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const accessToken = req?.cookies?.access_token as string | undefined;

    if (!accessToken) return false;

    const session =
      await this.authTokensService.findSessionByAccessToken(accessToken);

    if (!session) return false;

    req.session = session;

    return true;
  }
}
