import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

import { ROUTE_PUBLIC_KEY } from '@/shared/utils/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('Searching for public access');
    const isPublic = this.reflector.getAllAndOverride<boolean>(ROUTE_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as FastifyRequest;

    this.logger.debug('Searching token');
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.error('Token not found');
      throw new UnauthorizedException();
    }

    this.logger.debug('Extracting organization token');
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request['user'] = payload;
    } catch {
      this.logger.error('Token validation error');
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const fullToken = (request.headers['x-access-token'] as string) || request.headers['authorization'];

    const [type, token] = fullToken?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
