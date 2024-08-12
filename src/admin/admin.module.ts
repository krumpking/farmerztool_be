import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/database/database.module';
import { employeeProviders, farmProviders } from './admin.providers';
import { userProviders } from 'src/auth/auth.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    ...farmProviders,
    ...employeeProviders,
    ...userProviders,
  ],
})
export class AdminModule {}
