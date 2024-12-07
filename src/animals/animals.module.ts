import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import {
  animalAssetProviders,
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
import { AnimalAssetController } from './controllers/assets.controller';
import { AnimalAssetService } from './services/assets.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController, AnimalsUpdatesController, AnimalHealthController, AnimalGrowthController, AnimalOwnershipController, AnimalAssetController],
  providers: [
    AnimalsService,
    AnimalHealthService,
    AnimalGrowthService,
    AnimalOwnershipService,
    AnimalAssetService,
    ...animalProviders,
    ...breedingProviders,
    ...feedProviders,
    ...vaccinationProviders,
    ...userProviders,
    ...productionProviders,
    ...animalRequestProviders,
    ...animalGrowthProviders,
    ...animalHealthProviders,
    ...animalOwnershipProviders,
    ...animalAssetProviders
  ],
})
export class AnimalsModule { }
