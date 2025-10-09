import { UseGuards, applyDecorators } from '@nestjs/common';
import { AccessTokenGuard } from '../../app/auth/guards';

export function AuthGuard() {
  return applyDecorators(UseGuards(AccessTokenGuard));
}
