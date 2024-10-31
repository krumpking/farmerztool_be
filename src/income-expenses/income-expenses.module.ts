import { Module } from '@nestjs/common';
import { IncomeExpensesService } from './income-expenses.service';
import { IncomeExpensesController } from './income-expenses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { transactionProviders } from './income-expense.providers';
import { assetFinancialProviders, assetManagementProviders } from 'src/assets/assets.providers';
import { cropActivityProvider, cropProviders, financialProvider } from 'src/crops/crops.providers';
import { userProviders } from 'src/auth/auth.providers';
import { animalProviders, productionProviders } from 'src/animals/animal.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [IncomeExpensesController],
  providers: [IncomeExpensesService,
    ...transactionProviders,
    ...assetFinancialProviders,
    ...financialProvider,
    ...userProviders,
    ...cropActivityProvider,
    ...cropProviders,
    ...animalProviders,
    ...productionProviders,
    ...assetManagementProviders,
    ...assetFinancialProviders,
    


  ],
})
export class IncomeExpensesModule {}
