import { FastifyRequest } from 'fastify';

import { PayloadUser } from '@/domain/models/payload-user.model';

export interface AuthRequest extends FastifyRequest {
  user: PayloadUser;
}
