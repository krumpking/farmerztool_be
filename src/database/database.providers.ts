import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'src/common/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING),
    // await mongoose.connect("mongodb://127.0.0.1:27017/farmerztoolDB"),
  },
];
