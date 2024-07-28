import { Connection } from 'mongoose';

import { PaymentSchema } from './schema/payment.schema';
import { PAYMENT_MODEL } from './constants/payment.contact';
import { DATABASE_CONNECTION } from 'src/common/constants';

export const paymentProviders = [
  {
    provide: PAYMENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Payments', PaymentSchema),
    inject: [DATABASE_CONNECTION],
  },
];
