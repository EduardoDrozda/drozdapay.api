import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ILoggerWrapper } from './iLogger-wrapper';
import { TraceService } from '../tracing';

@Injectable()
export class LoggerWrapperService implements ILoggerWrapper {
  private readonly logger: ConsoleLogger;

  private traceId: string;

  constructor(private readonly trace: TraceService) {
    this.logger = new ConsoleLogger({
      json: true,
      colors: true,
      compact: true,
    });
  }

  logInfo(message: string): void {
    this.logger.log(this.buildMessage(message));
  }
  logError(message: string): void {
    this.logger.error(this.buildMessage(message));
  }
  logWarning(message: string): void {
    this.logger.warn(this.buildMessage(message));
  }

  private buildMessage(message: string): string {
    this.traceId = this.trace.getTraceId();
    return `${this.traceId} - ${message}`;
  }
}
