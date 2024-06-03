import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('BODY-LOGGER');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest() as FastifyRequest;

    return next.handle().pipe(
      tap(() => {
        if (req.method !== 'GET') {
          this.logger.log(JSON.stringify(req?.body));
        }
      }),
      catchError((error) => {
        if (req.method !== 'GET') {
          this.logger.error(JSON.stringify(req?.body));
        }
        return throwError(() => error);
      }),
    );
  }
}
