import { CreateBillUseCase } from './create-bill.usecase';
import { GetBillUseCase } from './get-bill.usecase';
import { GetByIdBillUseCase } from './get-by-id-bill.usecase';
import { UpdateBillUseCase } from './update-bill.usecase';

export const BILL_USE_CASES = [
  CreateBillUseCase,
  GetBillUseCase,
  GetByIdBillUseCase,
  UpdateBillUseCase,
];
