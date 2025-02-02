import { Global, Module } from '@nestjs/common';
import { TraceService } from './tracing';
import { LOGGER_SERVICE, LoggerWrapperService } from './logging';

@Global()
@Module({
  providers: [
    TraceService,
    {
      provide: LOGGER_SERVICE,
      useClass: LoggerWrapperService,
    },
  ],
  exports: [TraceService, LOGGER_SERVICE],
})
export class InfrastructureModule {}
