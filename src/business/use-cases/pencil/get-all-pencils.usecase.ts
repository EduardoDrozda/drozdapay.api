import { Inject, Injectable } from '@nestjs/common';
import {
  IPencilRepository,
  PENSIL_REPOSITORY,
} from '@domain/repositories';

@Injectable()
export class GetAllPencilsUseCase {
  constructor(
    @Inject(PENSIL_REPOSITORY) private pencilRepository: IPencilRepository,
  ) {}

  async execute() {
    return this.pencilRepository.findAll();
  }
}
