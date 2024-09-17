import { Inject, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-admin.dto';
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
import { Farm } from './interfaces/farm.interface';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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

  async addFarm(userId: string, adminId: string, farm: CreateFarmDto): Promise<ResponseDto> {
    try {
      // Check if farm name is already taken before adding farm
      const farmExists = await this.farmModel.findOne({
        farmName: farm.farmName,
        farmerName: farm.farmerName,
        adminId: adminId,
      });; 
      if (farmExists) {
        return ResponseDto.errorResponse('Farm already exists');
      }

      const newFarm = await this.farmModel.create({
        ...farm,
        adminId: adminId,
        createdBy: userId,
      });

      const createdFarm = await this.farmModel.findById(newFarm._id);

      if (!createdFarm) {
        return ResponseDto.errorResponse("Failed to create farm");
      }

      return ResponseDto.successResponse("Farm created", createdFarm);



    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to create farm");
    }
  }

  async getFarms(adminId: string): Promise<ResponseDto> {
    try {
      const farms = await this.farmModel.find({
        adminId: adminId,
      });
      if (!farms || farms.length === 0) {
        return ResponseDto.errorResponse("No farm available");
      }
      return ResponseDto.successResponse("Fetched farms", farms);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong, trying to fetch farms");
    }
  }

  async getFarm(id: string): Promise<ResponseDto> {
    try {
      const farm = await this.farmModel.findById(id);
      if (!farm) {
        return ResponseDto.errorResponse("No farm available");
      }
      return ResponseDto.successResponse("Fetched farm", farm);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong, trying to fetch farm");
    }
  }

  async updateFarm(id: string, updateFarmDto: UpdateFarmDto): Promise<ResponseDto> {
    try {
      const farm = await this.farmModel.findByIdAndUpdate(id, updateFarmDto, { new: true });
      if (!farm) {
        return ResponseDto.errorResponse("No farm available to update");
      }
      return ResponseDto.successResponse("Farm updated", farm);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong, failed to update farm");
    }
  }

  async deleteFarm(id: string): Promise<ResponseDto>{
    try {
      const farm = await this.farmModel.findByIdAndDelete(id);
      if (!farm) {
        return ResponseDto.errorResponse("No farm available to delete");
      }
      return ResponseDto.successResponse("Farm deleted", farm);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong, failed to delete farm");
    }
  }

  async getEmployees(adminId: string): Promise<ResponseDto> {
    try {
      
      const employeesExists = await this.employeeModel.find({
        adminId: adminId,
      });

      if (!employeesExists || employeesExists.length === 0) {
        return ResponseDto.errorResponse("No employees available");
      }

      return ResponseDto.successResponse("Fetched employees", employeesExists);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong, trying to fetch employees");
    }
  }

  async addEmployee(adminId: string, password: string, employee: EmployeeDto): Promise<ResponseDto> {
    try {
      const emailExists = await this.userModel.findOne({
        email: employee.email,
      });

      if (emailExists) {
        return ResponseDto.errorResponse("User already exists");
      } else {
        const employeeExists = await this.employeeModel.findOne({
          email: employee.email,
        });

        if (employeeExists) {
          return ResponseDto.errorResponse("Employee exists");
        } else {

          const createdEmployeeInstance = new this.employeeModel({
            adminId: adminId,
            ...employee
          });

          const employ = await createdEmployeeInstance.save();

          const employeeCreated = await this.employeeModel.findById(employ._id).select("-password");

          if(!employeeCreated){
            return ResponseDto.errorResponse("Failed to create employee");
          }

          const updateFarm = await this.farmModel.findOneAndUpdate({adminId}, {$push: {employees: employeeCreated._id}}, {new: true}).exec();


          if(!updateFarm){
            await this.employeeModel.findByIdAndDelete(employeeCreated._id);
            return ResponseDto.errorResponse("Failed to add employee to farm");
          }

          // send email

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
                email : employeeCreated.email,
                password: password,
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



          return ResponseDto.successResponse("Employee created", employeeCreated);

        }
      }
    } catch (error) {
      console.log(error);
      
      return ResponseDto.errorResponse("Failed to create employee");
    }
  }

  async getEmployee(id: string): Promise<ResponseDto> {
    try {
      const employeeExists = await this.employeeModel.findById(id);

      if(!employeeExists){
        return ResponseDto.errorResponse("Employee does not exist");
      }

      return ResponseDto.successResponse("Fetched employee", employeeExists);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Failed to fetch employee");
    }
  }
  

  async updateEmployee(id: string , updateEmployeeDto: UpdateEmployeeDto): Promise<ResponseDto>{
    try {
      const employeeExists = await this.employeeModel.findById(id);

      if(!employeeExists){
        return ResponseDto.errorResponse("Employee does not exist");
      }

      const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {new: true});

      if(!updatedEmployee){
        return ResponseDto.errorResponse("Failed to update employee");
      }

      return ResponseDto.successResponse("Employee updated", updatedEmployee);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Failed to update employee");
    }
  }

  async deleteEmployee(id: string): Promise<ResponseDto> {
    try {
      const employeeExists = await this.employeeModel.findById(id);

      if(!employeeExists){
        return ResponseDto.errorResponse("Employee does not exist");
      }

      const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);

      if(!deletedEmployee){
        return ResponseDto.errorResponse("Failed to delete employee");
      }

      return ResponseDto.successResponse("Employee deleted", deletedEmployee);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Failed to delete employee");
    }
   
  }
}
