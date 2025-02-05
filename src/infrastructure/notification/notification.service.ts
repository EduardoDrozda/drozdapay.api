import { HttpStatus, Injectable } from '@nestjs/common';
import { INotification } from './iNotification.service';

@Injectable()
export class NotificationService implements INotification {
  private messages?: { message: string; statusCode?: HttpStatus };

  get hasNotification(): boolean {
    return !!this.messages;
  }

  add(message: string, statusCode = HttpStatus.BAD_REQUEST): void {
    this.messages = {
      message,
      statusCode,
    };
  }

  clear(): void {
    this.messages = undefined;
  }

  getMessages(): { message: string; statusCode?: HttpStatus } | undefined {
    return this.messages;
  }
}
