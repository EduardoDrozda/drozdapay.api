export const AUTH_SERVICE = Symbol('IAuthenticationService');

export interface IAuthenticationService {
  login<T>(data: T): Promise<string>;
  verify(token: string): Promise<any>;
}
