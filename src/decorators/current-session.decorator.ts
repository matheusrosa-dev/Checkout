import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentSession = createParamDecorator(
  (_data, context: ExecutionContext) => {
    const { session } = context.switchToHttp().getRequest();

    return session;
  },
);
