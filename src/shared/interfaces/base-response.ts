import { HttpStatus } from "@nestjs/common";

export interface IBaseResponse<T> {
  error: boolean;
  errorMessages?: Array<string> | string;
  result: T | null;
  stackTrace?: string;
  status?: HttpStatus;
}