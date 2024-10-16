import { Module } from '@nestjs/common';
import { HatcheryService } from './hatchery.service';
import { HatcheryController } from './hatchery.controller';
import { hatcheryProviders } from './hatchery.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/auth/auth.providers';
import { farmProviders } from 'src/admin/admin.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [HatcheryController],
  providers: [
    HatcheryService,
    ...hatcheryProviders,
    ...userProviders,
    ...farmProviders,
  ],
})
export class HatcheryModule {}
