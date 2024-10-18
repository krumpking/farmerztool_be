import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import {
  animalProviders,
  animalRequestProviders,
  breedingProviders,
  feedProviders,
  productionProviders,
  vaccinationProviders
} from './animal.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/auth/auth.providers';
import { AnimalsUpdatesController } from './animal-updates.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController, AnimalsUpdatesController],
  providers: [
    AnimalsService,
    ...animalProviders,
    ...breedingProviders,
    ...feedProviders,
    ...vaccinationProviders,
    ...userProviders,
    ...productionProviders,
    ...animalRequestProviders,
  ],
})
export class AnimalsModule {}
