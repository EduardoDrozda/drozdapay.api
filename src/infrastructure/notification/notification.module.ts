import { Global, Module, Scope } from '@nestjs/common';
import { NOTIFICATION_SERVICE } from './iNotification.service';
import { NotificationService } from './notification.service';

@Global()
@Module({
  providers: [
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationService
    },
  ],
  exports: [NOTIFICATION_SERVICE],
})
export class NotificationModule { }
