import { HttpStatus } from '@nestjs/common';

export const NOTIFICATION_SERVICE = Symbol('INotification');

export interface INotification {
  get hasNotification(): boolean;
  add(message: string, statusCode?: HttpStatus): void;
  getMessages(): { message: string; statusCode?: HttpStatus } | undefined;
  clear(): void;
}
