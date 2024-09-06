import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cropProviders, irrigationProviders } from './crops.providers';
import { userProviders } from 'src/auth/auth.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CropsController],
  providers: [
    CropsService,
    ...cropProviders,
    ...irrigationProviders,
    ...userProviders,
  ],
})
export class CropsModule {}
