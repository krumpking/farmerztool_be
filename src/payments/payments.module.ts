import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { paymentProviders } from './payment.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/auth/auth.providers';
import { employeeProviders } from 'src/admin/admin.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService, 
    ...paymentProviders,
    ...userProviders,
    ...employeeProviders,
  ],
})
export class PaymentsModule {}
