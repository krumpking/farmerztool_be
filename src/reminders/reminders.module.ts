import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { reminderProviders } from './reminders.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RemindersController],
  providers: [
    RemindersService,
    ...reminderProviders,
  ],
})
export class RemindersModule {}
