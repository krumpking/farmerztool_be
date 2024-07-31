import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION, MONGOOSE_CONNECTION_STRING} from 'src/common/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(MONGOOSE_CONNECTION_STRING),
  },
];
