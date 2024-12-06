import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import {
  animalGrowthProviders,
  animalHealthProviders,
  animalOwnershipProviders,
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
import { AnimalGrowthService } from './services/growth.service';
import { AnimalGrowthController } from './controllers/growth.controller';
import { AnimalOwnershipController } from './controllers/ownership.controller';
import { AnimalOwnershipService } from './services/ownership.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController, AnimalsUpdatesController, AnimalHealthController, AnimalGrowthController, AnimalOwnershipController],
  providers: [
    AnimalsService,
    AnimalHealthService,
    AnimalGrowthService,
    AnimalOwnershipService,
    ...animalProviders,
    ...breedingProviders,
    ...feedProviders,
    ...vaccinationProviders,
    ...userProviders,
    ...productionProviders,
    ...animalRequestProviders,
    ...animalGrowthProviders,
    ...animalHealthProviders,
    ...animalOwnershipProviders
  ],
})
export class AnimalsModule { }
