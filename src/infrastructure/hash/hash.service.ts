import { IHashService } from './iHash.service';
import * as bcrypt from 'bcrypt';

export class HashService implements IHashService {
  async hash(data: string, salt = 10): Promise<string> {
    return bcrypt.hash(data, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
