import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { assetManagementProviders } from './assets.providers';
import { userProviders } from 'src/auth/auth.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AssetsController],
  providers: [
    AssetsService,
    ...assetManagementProviders,
    ...userProviders,
  ],
})
export class AssetsModule {}
