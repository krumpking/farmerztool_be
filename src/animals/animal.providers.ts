import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/common/constants';
import { AnimalSchema } from './schema/animal.schema';
import { ANIMAL_MODEL, BREEDING_MODEL } from './constants/animal.constants';
import { BreedingInfoSchema } from './schema/breeding.schema';

export const animalProviders = [
  {
    provide: ANIMAL_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Animals', AnimalSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const feedProviders = [
  {
    provide: BREEDING_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Breeding', BreedingInfoSchema),
    inject: [DATABASE_CONNECTION],
  },
];
