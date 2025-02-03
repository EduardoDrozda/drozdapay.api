import { Injectable } from '@nestjs/common';
import { INotification } from './iNotification.service';

@Injectable()
export class NotificationService implements INotification {
  private messages: string[] = [];

  get hasNotification(): boolean {
    return this.messages.length > 0;
  }

  add(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }

  getMessages(): string[] {
    return this.messages;
  }
}
