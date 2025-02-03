import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { IBaseResponse } from '@shared/interfaces/base-response';
import { map, Observable } from 'rxjs';
import { INotification, NOTIFICATION_SERVICE } from 'src/infrastructure/notification';


@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly notification: INotification) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      const url = context.switchToHttp().getRequest().url as string;
  
      if (url.startsWith('/health')) {
        return next.handle();
      }
  
      return next.handle().pipe(
        map((data) => {
          if (this.notification.hasNotification) {
            return {
              error: true,
              errorMessages: this.notification.getMessages(),
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
