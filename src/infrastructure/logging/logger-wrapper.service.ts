import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { ILoggerWrapper } from './iLogger-wrapper';
import { TraceService } from '../tracing';

@Injectable()
export class LoggerWrapperService implements ILoggerWrapper {
  private readonly logger = new ConsoleLogger({
    timestamp: true,
    json: true,
  });

  private traceId: string;

  constructor(private readonly trace: TraceService) {
    this.traceId = this.trace.getTraceId();
  }

  logInfo(message: string, context?: string): void {
    this.logger.log(this.buildMessage(message), context);
  }
  logError(message: string, context?: string): void {
    this.logger.error(this.buildMessage(message), context);
  }
  logWarning(message: string, context?: string): void {
    this.logger.warn(this.buildMessage(message), context);
  }

  private buildMessage(message: string): string {
    return `[${this.traceId}] - ${message}`;
  }
}
