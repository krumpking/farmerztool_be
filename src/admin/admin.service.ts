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
import { ResponseDto } from 'src/common/response.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject(FARM_MODEL)
    private farmModel: Model<Farm>,
    @Inject(EMPLOYEE_MODEL)
    private employeeModel: Model<Employee>,
    @Inject(USER_MODEL)
    private userModel: Model<User>,
  ) { }

  async addFarm(farm: CreateFarmDto): Promise<ResponseDto> {
    try {
      // Check if farm name is already taken before adding farm
      const farmExists = await this.farmModel.find({ adminId: farm.adminId });
      if (farmExists.length > 0) {
        // if farm exists upadate the farm
        const updatedFarm = this.farmModel.findOneAndUpdate(
          { adminId: farm.adminId },
          farm,
          { new: true },
        );
        return ResponseDto.successResponse("Farm updated", updatedFarm);
      } else {
        const createdFarm = new this.farmModel(farm);
        const farmCreated = await createdFarm.save();
        return ResponseDto.successResponse("New farm created", farmCreated);
      }
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to create farm");
    }
  }

  async getFarm(adminId: string): Promise<ResponseDto> {
    try {
      // Check if farm exist
      const farmExists = await this.farmModel.find({
        adminId: adminId,
      });

      if (farmExists.length > 0) {
        
        return ResponseDto.successResponse("Farm fetched", farmExists);
      } else {
        return ResponseDto.errorResponse("No farm available");
      }
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong, trying to fetch farm");
    }
  }

  async getEmployees(adminId: string): Promise<ResponseDto> {
    try {
      
      const employeesExists = await this.employeeModel.find({
        adminId: adminId,
      });

      if (employeesExists.length > 0) {

        return ResponseDto.successResponse("Fetched employess", employeesExists);
      } else {
        return ResponseDto.errorResponse("No employees available");
      }
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong, trying to fetch employees");
    }
  }

  async addEmployee(employee: EmployeeDto): Promise<ResponseDto> {
    try {
      const emailExists = await this.userModel.findOne({
        email: employee.email,
      });

      if (!emailExists) {
        return ResponseDto.errorResponse("User already exists");
      } else {
        const employeeExists = await this.employeeModel.find({
          email: employee.email,
        });

        if (employeeExists.length > 0) {
          
          const updatedEmployee = await this.employeeModel.findOneAndUpdate(
            { email: employee.email },
            employee,
            { new: true },
          );

          if (!updatedEmployee) {
            return ResponseDto.errorResponse("Employee exists,but failed to update");
          }

          return ResponseDto.successResponse("Employee updated", updatedEmployee);
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
              const status = poller.getResult();

              if (status != null && typeof status === 'string') {
                if (status === KnownEmailSendStatus.Succeeded) {
                  return true;
                } else {
                  return null;
                }
              } else {
                return null;
              }

            },
          );

          const createdEmployee = new this.employeeModel(employee);
          const employeeCreated =  await createdEmployee.save();

          if(!employeeCreated){
            return ResponseDto.errorResponse("Failed to create employee");
          }

          return ResponseDto.successResponse("Employee created", employeeCreated);

        }
      }
    } catch (error) {
      console.log(error);
      
      return ResponseDto.errorResponse("Failed to create employee");
    }
  }

  async deleteEmployee(employee: string): Promise<ResponseDto> {
    try {
      const employeeExists = await this.employeeModel.find({
        email: employee,
      });

      if (employeeExists.length > 0) {
        const deletedEmployee = await this.employeeModel.findOneAndDelete({ email: employee });

        if(!deletedEmployee){
          return ResponseDto.errorResponse("Failed to delete employ")
        }

        return ResponseDto.successResponse("Employee deleted", "");
      } else {
        return ResponseDto.errorResponse("No employee available");
      }
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong, failed to delete employee");
    }
  }
}
