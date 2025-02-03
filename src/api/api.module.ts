import { Global, Module } from '@nestjs/common';
import { PencilController } from './controllers';

@Global()
@Module({
  controllers: [PencilController],
})
export class ApiModule {}
