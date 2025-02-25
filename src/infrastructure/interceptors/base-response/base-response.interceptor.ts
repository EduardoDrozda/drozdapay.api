import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map, Observable } from 'rxjs';
import {
  INotification,
  NOTIFICATION_SERVICE,
} from '@infrastructure/notification';

export interface IBaseResponse<T> {
  error: boolean;
  errorMessages?: { message: string; statusCode?: HttpStatus };
  result: T | null;
  stackTrace?: string;
  status?: HttpStatus;
}

@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notification: INotification,
  ) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const url = context.switchToHttp().getRequest().url as string;
    const response = context.switchToHttp().getResponse();

    if (url.startsWith('/health')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        if (this.notification.hasNotification) {
          const notification = { ...this.notification.getMessages()! };
          this.notification.clear();
          response.status(
            notification.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          );

          return {
            error: true,
            errorMessages: notification,
            result: null,
          } as IBaseResponse<any>;
        }

        return {
          error: false,
          result: data,
        } as IBaseResponse<any>;
      }),
    );
  }
}
