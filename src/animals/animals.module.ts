import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import {
  animalProviders,
  breedingProviders,
  feedProviders,
} from './animal.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [
    AnimalsService,
    ...animalProviders,
    ...breedingProviders,
    ...feedProviders,
  ],
})
export class AnimalsModule {}
