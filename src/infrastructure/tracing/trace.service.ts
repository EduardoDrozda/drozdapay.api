import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'node:crypto';

@Injectable()
export class TraceService {
  private storage = new AsyncLocalStorage<Map<string, string>>();

  getTraceId(): string {
    return this.storage.getStore()?.get('traceId') || randomUUID();
  }

  setTraceId(traceId: string): void {
    const store = this.storage.getStore() || new Map<string, string>();
    store.set('traceId', traceId);
    this.storage.enterWith(store);
  }
}
