import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetLoggedUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = await request.user;
    return user?.sub || null;
  },
);
