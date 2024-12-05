import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/common/constants';
import { EMPLOYEE_MODEL, FARM_MODEL } from './constants/admin.constants';
import { FarmSchema } from './schema/admin.schema';
import { EmployeeSchema } from './schema/employee.schema';

export const farmProviders = [
  {
    provide: FARM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Farm', FarmSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const employeeProviders = [
  {
    provide: EMPLOYEE_MODEL,
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * A factory function that creates and returns the Mongoose model for the 'Employee' collection,
     * using the provided EmployeeSchema. This function requires a Mongoose connection instance.
     *
     * @param connection - A Mongoose Connection instance used to define the model.
     * @returns A Mongoose Model for the 'Employee' collection.
     */
    /******  baf74a7e-0fa4-4cb6-a618-afa34a4af984  *******/
    useFactory: (connection: Connection) =>
      connection.model('Employee', EmployeeSchema),
    inject: [DATABASE_CONNECTION],
  },
];
