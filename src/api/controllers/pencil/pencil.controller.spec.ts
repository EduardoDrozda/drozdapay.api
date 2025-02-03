import { Test, TestingModule } from '@nestjs/testing';
import { PencilController } from './pencil.controller';

describe('PencilController', () => {
  let controller: PencilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PencilController],
    }).compile();

    controller = module.get<PencilController>(PencilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
