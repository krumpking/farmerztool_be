import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { contactActivityProviders, contactDocumentProviders, contactFinancialActivityProviders, contactsProviders } from './contacts.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FinancialActivityController } from './controllers/financialActivity.controller';
import { ContactActivityController } from './controllers/activity.controllers';
import { ContactDocumentsController } from './controllers/documents.controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController,
    FinancialActivityController,
    ContactActivityController,
    ContactDocumentsController
  ],
  providers: [ContactsService,
    ...contactsProviders,
    ...contactFinancialActivityProviders,
    ...contactActivityProviders,
    ...contactDocumentProviders
  ],
})
export class ContactsModule {}
