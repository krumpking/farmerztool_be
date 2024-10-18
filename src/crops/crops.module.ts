import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cropActivityProvider, cropProviders, fertilizerPesticideProvider, financialProvider, irrigationProviders, pestdieaseIssueProvider } from './crops.providers';
import { userProviders } from 'src/auth/auth.providers';
import { farmProviders } from 'src/admin/admin.providers';
import { CropsUpdatesController } from './crops-update.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CropsController, CropsUpdatesController],
  providers: [
    CropsService,
    ...cropProviders,
    ...irrigationProviders,
    ...userProviders,
    ...farmProviders,
    ...fertilizerPesticideProvider,
    ...financialProvider,
    ...cropActivityProvider,
    ...pestdieaseIssueProvider
  ],
})
export class CropsModule {}
