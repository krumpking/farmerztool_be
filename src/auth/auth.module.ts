import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import {
  otpProviders,
  userProviders,
  employeeProviders,
} from './auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/common/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { farmProviders } from 'src/admin/admin.providers';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    ...userProviders,
    ...otpProviders,
    ...employeeProviders,
    ...farmProviders,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
