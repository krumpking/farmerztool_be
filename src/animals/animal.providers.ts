import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/common/constants';
import { AnimalSchema } from './schema/animal.schema';
import { ANIMAL_MODEL } from './constants/animal.constants';

export const animalProviders = [
  {
    provide: ANIMAL_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Animals', AnimalSchema),
    inject: [DATABASE_CONNECTION],
  },
];
