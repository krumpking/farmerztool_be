import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/common/constants';
import { FARM_MODEL } from './constants/admin.constants';
import { FarmSchema } from './schema/admin.schema';

export const farmProviders = [
  {
    provide: FARM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Farms', FarmSchema),
    inject: [DATABASE_CONNECTION],
  },
];
