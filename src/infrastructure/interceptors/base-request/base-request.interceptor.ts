import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { randomUUID } from 'node:crypto';
import { Observable } from 'rxjs';
import { TraceService } from 'src/infrastructure/tracing';

@Injectable()
export class BaseRequestInterceptor implements NestInterceptor {
  constructor(private readonly traceService: TraceService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const url = req.url;

    if (url.startsWith('/health')) {
      return next.handle();
    }

    const traceId = req.header('x-trace-id') || randomUUID();

    this.traceService.setTraceId(traceId);
    return next.handle();
  }
}
