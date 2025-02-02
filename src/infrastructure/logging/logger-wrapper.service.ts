import { Injectable, Logger } from '@nestjs/common';
import { ILoggerWrapper } from './iLogger-wrapper';

@Injectable()
export class LoggerWrapperService implements ILoggerWrapper {
    private readonly logger: Logger = new Logger();

    logInfo(message: string, context?: string): void {
        this.logger.log(message, context);
    }
    logError(message: string, context?: string): void {
        this.logger.error(message, context);
    }
    logWarning(message: string, context?: string): void {
        this.logger.warn(message, context);
    }
}
