import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/common/constants';
import { AnimalSchema } from './schema/animal.schema';
import {
  ANIMAL_MODEL,
  ANIMAL_PRODUCTION_MODEL,
  BREEDING_MODEL,
  FEED_MODEL,
  VACCINATION_MODEL
} from './constants/animal.constants';
import { BreedingInfoSchema } from './schema/breeding.schema';
import { FeedSchema } from './schema/feed.schema';
import { VaccinationSchema } from './schema/vaccination.schema';
import { AnimalProductionSchema } from './schema/production.schema';


export const animalProviders = [
  {
    provide: ANIMAL_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Animals', AnimalSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const breedingProviders = [
  {
    provide: BREEDING_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Breeding', BreedingInfoSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const feedProviders = [
  {
    provide: FEED_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Feed', FeedSchema),
    inject: [DATABASE_CONNECTION],
  },
  ]

  export const vaccinationProviders = [
  {
    provide: VACCINATION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Vaccination', VaccinationSchema),
    inject: [DATABASE_CONNECTION],
  },

];


export const productionProviders = [
    {
      provide: ANIMAL_PRODUCTION_MODEL,
      useFactory: (connection: Connection) => 
        connection.model('Production', AnimalProductionSchema),
      inject: [DATABASE_CONNECTION]
    },
];