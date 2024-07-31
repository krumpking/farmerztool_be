import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/database/database.module';
import { employeeProviders, farmProviders } from './admin.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, ...farmProviders, ...employeeProviders],
})
export class AdminModule {}
