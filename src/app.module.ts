import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AnimalsModule } from './animals/animals.module';
import { CropsModule } from './crops/crops.module';
import { HatcheryModule } from './hatchery/hatchery.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    DatabaseModule,
    AdminModule,
    AuthModule,
    PaymentsModule,
    AnimalsModule,
    CropsModule,
    HatcheryModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
