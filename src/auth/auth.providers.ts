import { Connection } from 'mongoose';
import { UserSchema } from './schema/user.schema';
import { DATABASE_CONNECTION } from 'src/common/constants';
import { OTP_MODEL, USER_MODEL } from './constants/auth.constants';
import { OtpSchema } from './schema/otp.schema';
import { EMPLOYEE_MODEL } from 'src/admin/constants/admin.constants';
import { EmployeeSchema } from 'src/admin/schema/employee.schema';

export const userProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Users', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const otpProviders = [
  {
    provide: OTP_MODEL,
    useFactory: (connection: Connection) => connection.model('Otp', OtpSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const employeeProviders = [
  {
    provide: EMPLOYEE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Employees', EmployeeSchema),
    inject: [DATABASE_CONNECTION],
  },
];
