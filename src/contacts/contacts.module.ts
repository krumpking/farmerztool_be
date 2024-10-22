import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { contactActivityProviders, contactFinancialActivityProviders, contactsProviders } from './contacts.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FinancialActivityController } from './controllers/financialActivity.controller';
import { ContactActivityController } from './controllers/activity.controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController,
    FinancialActivityController,
    ContactActivityController,
  ],
  providers: [ContactsService,
    ...contactsProviders,
    ...contactFinancialActivityProviders,
    ...contactActivityProviders
  ],
})
export class ContactsModule {}
