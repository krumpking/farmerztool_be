import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { contactsProviders } from './contacts.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController],
  providers: [ContactsService,
    ...contactsProviders
  ],
})
export class ContactsModule {}
