import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateFarmDto } from './dto/create-admin.dto';
import { ResponseDto } from 'src/common/response.dto';
import { permission } from 'process';
import { EmployeeDto } from './dto/employee.dto';
import * as bcrypt from 'bcrypt';

@Controller('/api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('farm')
  async addFarm(
    @Body('farm') createFarmDto: CreateFarmDto,
  ): Promise<ResponseDto> {

    // add or edit
    const farm = await this.adminService.addFarm(createFarmDto);
    
    if (farm == null) {
      return {
        data: null,
        message: 'Error adding farm',
        success: false,
      };
    } else {
      return {
        data: farm,
        message: 'Farm was registered successfully',
        success: true,
      };
    }
  }

  @Get('farm/:adminId')
  async getFarm(@Param('adminId') adminId: String): Promise<ResponseDto> {
    const employee = await this.adminService.getFarm(adminId);

    if (employee == null) {
      return {
        data: null,
        message: 'Error getting employees',
        success: false,
      };
    } else {
      return {
        data: employee,
        message: 'Got employees successfully',
        success: true,
      };
    }
  }

  @Get('users/:adminId')
  async getEmployees(@Param('adminId') adminId: String): Promise<ResponseDto> {
    const employee = await this.adminService.getEmployees(adminId);

    if (employee == null) {
      return {
        data: null,
        message: 'Error getting employees',
        success: false,
      };
    } else {
      return {
        data: employee,
        message: 'Got employees successfully',
        success: true,
      };
    }
  }

  @Post('add/user')
  async addEmployee(
    @Body('user') employeeDto: EmployeeDto,
  ): Promise<ResponseDto> {
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(employeeDto.password, saltOrRounds);

    let newUser: EmployeeDto = {
      email: employeeDto.email,
      password: hash,
      adminId: employeeDto.adminId,
      perms: employeeDto.perms,
    };

    const employee = await this.adminService.addEmployee(newUser);


    if (employee == null) {
      return {
        data: null,
        message: 'Error adding employee',
        success: false,
      };
    } else {
      return {
        data: employee,
        message: 'Employee was registered successfully',
        success: true,
      };
    }
  }

  @Delete('delete/employee')
  async deleteEmployee(@Body('email') email: string): Promise<ResponseDto> {
    const farm = await this.adminService.deleteEmployee(email);

    if (farm == null) {
      return {
        data: null,
        message: 'Error deleting user',
        success: false,
      };
    } else {
      return {
        data: farm,
        message: 'User was deleted successfully',
        success: true,
      };
    }
  }
}
