export const NOTIFICATION_SERVICE = Symbol('INotification');

export interface INotification {
  get hasNotification(): boolean;
  add(message: string): void;
  clear(): void;
  getMessages(): string[];
}
