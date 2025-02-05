import { Global, Module } from '@nestjs/common';
import { LOGGER_SERVICE } from './iLogger-wrapper';
import { LoggerWrapperService } from './logger-wrapper.service';

@Global()
@Module({
  providers: [
    {
      provide: LOGGER_SERVICE,
      useClass: LoggerWrapperService,
    },
  ],
  exports: [LOGGER_SERVICE],
})
export class LoggerModule {}
