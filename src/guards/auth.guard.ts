import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthTokensService } from '../providers/redis/auth-tokens.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authTokensService: AuthTokensService,
    private readonly reflector: Reflector,
  ) {}

  private getIsPublic(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic;
  }

  private async getSessions(req: Request) {
    const accessToken = req?.cookies?.access_token as string | undefined;
    const refreshToken = req?.cookies?.refresh_token as string | undefined;

    if (!accessToken || !refreshToken)
      return { session: null, refreshSession: null };

    const promises = [
      this.authTokensService.findSessionByAccessToken(accessToken),
      this.authTokensService.findSessionByRefreshToken(refreshToken),
    ];

    const [session, refreshSession] = await Promise.all(promises);

    return { session, refreshSession };
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const isPublic = this.getIsPublic(context);

    if (isPublic) return true;

    const { session, refreshSession } = await this.getSessions(req);

    if (!session && !refreshSession) return false;

    if (!session) {
      const tokens = await this.authTokensService.generateOpaqueTokens(
        refreshSession!,
      );

      res.cookie('access_token', tokens.accessToken, {
        httpOnly: true,
      });

      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
      });

      req.session = refreshSession;

      return true;
    }

    req.session = session;

    return true;
  }
}
