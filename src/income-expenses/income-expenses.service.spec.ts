import { Test, TestingModule } from '@nestjs/testing';
import { IncomeExpensesService } from './income-expenses.service';

describe('IncomeExpensesService', () => {
  let service: IncomeExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeExpensesService],
    }).compile();

    service = module.get<IncomeExpensesService>(IncomeExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
