import { Inject, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-admin.dto';
import { Farm } from './entities/admin.entity';
import { Model } from 'mongoose';
import { EMPLOYEE_MODEL, FARM_MODEL } from './constants/admin.constants';
import { Employee } from './interfaces/employee.interface';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject(FARM_MODEL)
    private farmModel: Model<Farm>,
    @Inject(EMPLOYEE_MODEL)
    private employeeModel: Model<Employee>,
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

  async getFarm(adminId: String): Promise<any> {
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

  async getEmployees(adminId: String): Promise<any> {
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
      // Check if farm name is already taken before adding farm
      const employeeExists = await this.employeeModel.find({
        email: employee.email,
      });

      console.log(employeeExists);

      if (employeeExists.length > 0) {
        // if farm exists upadate the farm
        return this.employeeModel.findOneAndUpdate(
          { email: employee.email },
          employee,
          { new: true },
        );
      } else {
        const createdEmployee = new this.employeeModel(employee);
        return createdEmployee.save();
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
