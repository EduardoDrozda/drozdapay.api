export const LOGGER_SERVICE = Symbol('LoggerWrapperService');

export interface ILoggerWrapper {
  logInfo(message: string, context?: string): void;
  logError(message: string, context?: string): void;
  logWarning(message: string, context?: string): void;
}
