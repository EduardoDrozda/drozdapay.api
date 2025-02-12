import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AUTH_SERVICE,
  IAuthenticationService,
} from './IAuthentication.service';
import { Request } from 'express';
import {
  INotification,
  NOTIFICATION_SERVICE,
} from '@infrastructure/notification';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotification,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.notificationService.add('Token is not provided');
      throw new UnauthorizedException('Token is not provided');
    }

    try {
      const payload = this.authenticationService.verify(token);
      request.user = payload;
      
      return true;
    } catch (e) {
      this.notificationService.add('Token is invalid');
      throw new UnauthorizedException('Token is invalid');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
