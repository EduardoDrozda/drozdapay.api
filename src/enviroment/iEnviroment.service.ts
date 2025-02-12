import { EnvTypes } from './env-schema.config';

export const ENVIROMENT_SERVICE = Symbol('EnviromentService');

export interface IEnvironmentService {
  get(key: keyof EnvTypes): string | undefined;
}
