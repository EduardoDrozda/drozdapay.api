import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RepositoriesModule } from './repositories';
import { HashModule } from './hash/hash.module';
import { AuthenticationModule } from './authentication';
import { TraceModule } from './tracing/trace.module';
import { NotificationModule } from './notification/notification.module';
import { LoggerModule } from './logging/logger.module';
import { AsyncLocalStorage } from 'async_hooks';

@Module({
  imports: [RepositoriesModule, HashModule, AuthenticationModule, TraceModule, NotificationModule, LoggerModule],
  providers: [
  ],
  exports: [
    RepositoriesModule,
    HashModule,
    AuthenticationModule,
    TraceModule
  ],
})
export class InfrastructureModule { }

