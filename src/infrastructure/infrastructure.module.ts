import { Global, Module } from '@nestjs/common';
import { TraceService } from './tracing';
import { LOGGER_SERVICE, LoggerWrapperService } from './logging';
import { NOTIFICATION_SERVICE, NotificationService } from './notification';
import { RepositoriesModule } from './repositories';
import { HashModule } from './hash/hash.module';
import { AuthenticationModule } from './authentication';

@Module({
  imports: [RepositoriesModule, HashModule, AuthenticationModule],
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
  exports: [
    RepositoriesModule,
    HashModule,
    AuthenticationModule,
    TraceService,
    LOGGER_SERVICE,
    NOTIFICATION_SERVICE,
  ],
})
export class InfrastructureModule {}
