import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cropProviders, fertilizerPesticideProvider, financialProvider, irrigationProviders } from './crops.providers';
import { userProviders } from 'src/auth/auth.providers';
import { farmProviders } from 'src/admin/admin.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CropsController],
  providers: [
    CropsService,
    ...cropProviders,
    ...irrigationProviders,
    ...userProviders,
    ...farmProviders,
    ...fertilizerPesticideProvider,
    ...financialProvider
  ],
})
export class CropsModule {}
