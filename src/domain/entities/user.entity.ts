import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
}
