import { Module } from '@nestjs/common';
import { HatcheryService } from './hatchery.service';
import { HatcheryController } from './hatchery.controller';
import { hatcheryProviders } from './hatchery.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HatcheryController],
  providers: [
    HatcheryService,
    ...hatcheryProviders
  ],
})
export class HatcheryModule {}
