import { Test, TestingModule } from '@nestjs/testing';
import { IncomeExpensesController } from './income-expenses.controller';
import { IncomeExpensesService } from './income-expenses.service';

describe('IncomeExpensesController', () => {
  let controller: IncomeExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeExpensesController],
      providers: [IncomeExpensesService],
    }).compile();

    controller = module.get<IncomeExpensesController>(IncomeExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
