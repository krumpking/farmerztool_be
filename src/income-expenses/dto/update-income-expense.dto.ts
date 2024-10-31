import { PartialType } from '@nestjs/swagger';
import { CreateIncomeExpenseDto } from './create-income-expense.dto';

export class UpdateIncomeExpenseDto extends PartialType(CreateIncomeExpenseDto) {}
