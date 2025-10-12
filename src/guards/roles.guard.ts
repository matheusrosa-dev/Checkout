import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../app/users/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const allowedRoles: Roles[] = this.reflector.getAllAndOverride(
      'allowed-roles',
      [context.getHandler(), context.getClass()],
    );

    const sessionRole: Roles | undefined = context.switchToHttp().getRequest()
      ?.session?.role;

    if (!allowedRoles?.length) return true;

    if (!sessionRole) return false;

    if (allowedRoles.includes(sessionRole)) return true;

    return false;
  }
}
