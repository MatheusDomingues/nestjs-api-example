import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request, reply, next: () => void): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.headers['user-agent'] || '';

    reply.on('finish', () => {
      const { statusCode } = reply;

      if (method !== 'OPTIONS') {
        this.logger.log(`${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`);
      }
    });

    next();
  }
}
