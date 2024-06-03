import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { PayloadUser } from '@/domain/models/payload-user.model';
import { AuthRequest } from '@/types/auth-request';

export const AuthUser = createParamDecorator((_, context: ExecutionContext): PayloadUser => {
  const request = context.switchToHttp().getRequest<AuthRequest>();

  return request.user;
});
