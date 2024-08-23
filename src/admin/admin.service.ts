import { Inject, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-admin.dto';
import { Farm } from './entities/admin.entity';
import { Model } from 'mongoose';
import { EMPLOYEE_MODEL, FARM_MODEL } from './constants/admin.constants';
import { Employee } from './interfaces/employee.interface';
import { EmployeeDto } from './dto/employee.dto';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';
import { readHTMLFile } from 'src/common/utils';
import { dirname } from 'path';
import handlebars from 'handlebars';
import { USER_MODEL } from 'src/auth/constants/auth.constants';
import { User } from 'src/auth/interfaces/user.interface';

@Injectable()
export class AdminService {
  constructor(
    @Inject(FARM_MODEL)
    private farmModel: Model<Farm>,
    @Inject(EMPLOYEE_MODEL)
    private employeeModel: Model<Employee>,
    @Inject(USER_MODEL)
    private userModel: Model<User>,
  ) {}

  async addFarm(farm: CreateFarmDto): Promise<any> {
    try {
      // Check if farm name is already taken before adding farm
      const farmExists = await this.farmModel.find({ adminId: farm.adminId });

      if (farmExists.length > 0) {
        // if farm exists upadate the farm
        return this.farmModel.findOneAndUpdate(
          { adminId: farm.adminId },
          farm,
          { new: true },
        );
      } else {
        const createdFarm = new this.farmModel(farm);
        return createdFarm.save();
      }
    } catch (error) {
      return null;
    }
  }

  async getFarm(adminId: string): Promise<any> {
    try {
      // Check if farm name is already taken before adding farm
      const farmExists = await this.farmModel.find({
        adminId: adminId,
      });

      if (farmExists.length > 0) {
        // if farm exists upadate the farm
        return farmExists;
      } else {
        return [];
      }
    } catch (error) {
      return null;
    }
  }

  async getEmployees(adminId: string): Promise<any> {
    try {
      // Check if farm name is already taken before adding farm
      const employeesExists = await this.employeeModel.find({
        adminId: adminId,
      });

      if (employeesExists.length > 0) {
        // if farm exists upadate the farm
        return employeesExists;
      } else {
        return [];
      }
    } catch (error) {
      return null;
    }
  }

  async addEmployee(employee: EmployeeDto): Promise<any> {
    try {
      const emailExists = await this.userModel.findOne({
        email: employee.email,
      });

      if (emailExists != null) {
        return null;
      } else {
        // Check if farm name is already taken before adding farm
        const employeeExists = await this.employeeModel.find({
          email: employee.email,
        });

        if (employeeExists.length > 0) {
          // if farm exists upadate the farm
          return this.employeeModel.findOneAndUpdate(
            { email: employee.email },
            employee,
            { new: true },
          );
        } else {
          const appDir = dirname(require.main.path);

          

          readHTMLFile(
            `${appDir}/src/admin/html/otpUser.html`,
            async (err: any, html: any) => {
              if (err) {
                console.log('error reading file', err);
                return;
              }

              const template = handlebars.compile(html);
              const replacements = {
                otp: '',
              };

              const htmlToSend = template(replacements);

              const connectionString =
                'endpoint=https://farmerztoolcommsservice.unitedstates.communication.azure.com/;accesskey=8keRIH8BsaK0RqbSEuNO9PWRFlcRljH987qWBpcpjQcMvW55NwvGJQQJ99AHACULyCpB7fcQAAAAAZCSuwZw';
              const client = new EmailClient(connectionString);

              const emailMessage = {
                senderAddress:
                  'DoNotReply@ecbfcf1d-9676-45a9-9a59-84b5c339b606.azurecomm.net',
                content: {
                  subject: 'Farmerztool Account Created',
                  html: htmlToSend,
                },
                recipients: {
                  to: [{ address: employee.email }],
                },
              };

              const poller = await client.beginSend(emailMessage);
                         },
          );

           const createdEmployee = new this.employeeModel(employee);
              return await createdEmployee.save();

        }
      }
    } catch (error) {
      return null;
    }
  }

  async deleteEmployee(employee: string): Promise<any> {
    try {
      // Check if farm name is already taken before adding farm
      const employeeExists = await this.employeeModel.find({
        email: employee,
      });

      if (employeeExists.length > 0) {
        // if farm exists upadate the farm
        return this.employeeModel.findOneAndDelete({ email: employee });
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
