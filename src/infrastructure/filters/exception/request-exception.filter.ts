import { IBaseResponse } from '@infrastructure/interceptors';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class RequestExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const payload: IBaseResponse<string> = {
      error: true,
      errorMessages: exception.getResponse().message,
      result: null,
      status,
    };

    response.status(status).json(payload);
  }
}
