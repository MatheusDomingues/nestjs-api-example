import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

@Injectable()
export class BodyParserInterceptor implements NestInterceptor {
  private readonly logger = new Logger('BODY-PARSER');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest() as FastifyRequest;
    this.logger.log('Typeof body: ' + typeof req?.body);

    if (req?.body && typeof req?.body === 'string') {
      this.logger.log('Parsing body');
      req['body'] = JSON.parse(req?.body);
    }

    return next.handle().pipe();
  }
}
