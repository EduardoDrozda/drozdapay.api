export const LOGGER_SERVICE = Symbol('LoggerWrapperService');

export interface ILoggerWrapper {
  logInfo(message: string): void;
  logError(message: string): void;
  logWarning(message: string): void;
}
