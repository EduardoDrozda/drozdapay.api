import { Injectable } from '@nestjs/common';
import { IAuthenticationService } from './IAuthentication.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async login(data: any): Promise<string> {
    return await this.jwtService.signAsync(data);
  }

  async verify(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }
}
