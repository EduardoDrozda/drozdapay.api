import { ILoggerWrapper, LOGGER_SERVICE } from '@infrastructure/logging';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HASH_SERVICE, IHashService } from '@infrastructure/hash';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '@domain/repositories/iUser.repository';
import { CreateAuthenticationDTO, GetAuthenticationDTO } from '@business/dtos';
import {
  INotification,
  NOTIFICATION_SERVICE,
} from '@infrastructure/notification';
import {
  AUTH_SERVICE,
  IAuthenticationService,
} from '@infrastructure/authentication';

@Injectable()
export class CreateAuthenticationUseCase {
  constructor(
    @Inject(LOGGER_SERVICE) private logger: ILoggerWrapper,
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private hashService: IHashService,
    @Inject(NOTIFICATION_SERVICE) private notificationService: INotification,
    @Inject(AUTH_SERVICE) private authService: IAuthenticationService,
  ) {}

  async execute(
    data: CreateAuthenticationDTO,
  ): Promise<GetAuthenticationDTO | void> {
    this.logger.logInfo(`${this.constructor.name} - Executing...`);

    const user = await this.userRepository.findByEmail(data.email);

    if (
      !user ||
      !(await this.hashService.compare(data.password, user.password))
    ) {
      const errorMessage = 'Email or password is incorrect';
      this.logger.logError(errorMessage);
      this.notificationService.add(errorMessage, HttpStatus.UNAUTHORIZED);
      return;
    }

    this.logger.logInfo(`${this.constructor.name} - Executed.`);
    
    const result = await this.authService.login({
      sub: user.id,
      username: user.email,
    });

    return { accessToken: result, type: 'Bearer' };
  }
}
