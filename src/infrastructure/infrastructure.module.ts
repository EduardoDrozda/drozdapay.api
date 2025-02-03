import { Global, Module } from '@nestjs/common';
import { TraceService } from './tracing';
import { LOGGER_SERVICE, LoggerWrapperService } from './logging';
import { NOTIFICATION_SERVICE, NotificationService } from './notification';

@Global()
@Module({
  providers: [
    TraceService,
    {
      provide: LOGGER_SERVICE,
      useClass: LoggerWrapperService,
    },
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationService,
    },
  ],
  exports: [TraceService, LOGGER_SERVICE, NOTIFICATION_SERVICE],
})
export class InfrastructureModule {}
