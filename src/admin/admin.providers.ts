import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/common/constants';
import { EMPLOYEE_MODEL, FARM_MODEL } from './constants/admin.constants';
import { FarmSchema } from './schema/admin.schema';
import { EmployeeSchema } from './schema/employee.schema';

export const farmProviders = [
  {
    provide: FARM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Farms', FarmSchema),
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
