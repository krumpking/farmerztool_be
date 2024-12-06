import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/common/constants';
import { AnimalSchema } from './schema/animal.schema';
import {
  ANIMAL_GROWTH_MODEL,
  ANIMAL_HEALTH_MODEL,
  ANIMAL_MODEL,
  ANIMAL_OWNERSHIP_MODEL,
  ANIMAL_PRODUCTION_MODEL,
  ANIMAL_REQUEST_MODEL,
  BREEDING_MODEL,
  FEED_MODEL,
  VACCINATION_MODEL
} from './constants/animal.constants';
import { BreedingInfoSchema } from './schema/breeding.schema';
import { FeedSchema } from './schema/feed.schema';
import { VaccinationSchema } from './schema/vaccination.schema';
import { AnimalProductionSchema } from './schema/production.schema';
import { AnimalRequestSchema } from './schema/animalbyEmployee.schema';
import AnimalGrowthSchema from './schema/animalGrowth.schema';
import { animalHealthSchema } from './schema/animalHealth.schema';
import { AnimalOwnershipSchema } from './schema/animalOwnership.schema';


export const animalProviders = [
  {
    provide: ANIMAL_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Animal', AnimalSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const breedingProviders = [
  {
    provide: BREEDING_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('AnimalBreeding', BreedingInfoSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const feedProviders = [
  {
    provide: FEED_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('AnimalFeed', FeedSchema),
    inject: [DATABASE_CONNECTION],
  },
]

export const vaccinationProviders = [
  {
    provide: VACCINATION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('AnimalVaccination', VaccinationSchema),
    inject: [DATABASE_CONNECTION],
  },

];


export const productionProviders = [
  {
    provide: ANIMAL_PRODUCTION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('AnimalProduction', AnimalProductionSchema),
    inject: [DATABASE_CONNECTION]
  },
];

export const animalRequestProviders = [
  {
    provide: ANIMAL_REQUEST_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('AnimalRequest', AnimalRequestSchema),
    inject: [DATABASE_CONNECTION],
  },
]

// New provider for AnimalGrowth
export const animalGrowthProviders = [
  {
    provide: ANIMAL_GROWTH_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('AnimalGrowth', AnimalGrowthSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const animalHealthProviders = [
  {
    provide: ANIMAL_HEALTH_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('AnimalHealth', animalHealthSchema),
    inject: [DATABASE_CONNECTION],
  },
]

export const animalOwnershipProviders = [
  {
    provide: ANIMAL_OWNERSHIP_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('AnimalOwnership', AnimalOwnershipSchema),
    inject: [DATABASE_CONNECTION],
  },
];