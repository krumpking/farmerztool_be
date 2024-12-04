import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import {
  animalGrowthProviders,
  animalHealthProviders,
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
import { AnimalHealthService } from './services/health.service';
import { AnimalHealthController } from './controllers/health.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController, AnimalsUpdatesController, AnimalHealthController],
  providers: [
    AnimalsService,
    AnimalHealthService,
    ...animalProviders,
    ...breedingProviders,
    ...feedProviders,
    ...vaccinationProviders,
    ...userProviders,
    ...productionProviders,
    ...animalRequestProviders,
    ...animalGrowthProviders,
    ...animalHealthProviders,
  ],
})
export class AnimalsModule { }
