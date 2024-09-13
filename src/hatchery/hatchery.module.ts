import { Module } from '@nestjs/common';
import { HatcheryService } from './hatchery.service';
import { HatcheryController } from './hatchery.controller';

@Module({
  controllers: [HatcheryController],
  providers: [HatcheryService],
})
export class HatcheryModule {}
