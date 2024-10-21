import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { contactFinancialActivityProviders, contactsProviders } from './contacts.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FinancialActivityController } from './controllers/financialActivity.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController,
    FinancialActivityController,
  ],
  providers: [ContactsService,
    ...contactsProviders,
    ...contactFinancialActivityProviders,
  ],
})
export class ContactsModule {}
