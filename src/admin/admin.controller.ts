import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateFarmDto } from './dto/create-admin.dto';
// import { permission } from 'process';
import { EmployeeDto } from './dto/employee.dto';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Admin Routes")
@ApiBearerAuth()
@Controller('/api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('farm')
  async addFarm(
    @Body() createFarmDto: CreateFarmDto,
  ){
    return this.adminService.addFarm(createFarmDto);
  }

  @Get('farm/:adminId')
  async getFarm(@Param('adminId') adminId: string){
    return this.adminService.getFarm(adminId);
  }

  @Get('users/:adminId')
  async getEmployees(@Param('adminId') adminId: string) {
    return this.adminService.getEmployees(adminId);
  }

  @Post('add/user')
  async addEmployee(
    @Body() employeeDto: EmployeeDto,
  ){
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(employeeDto.password, saltOrRounds);

    const newUser: EmployeeDto = {
      email: employeeDto.email,
      password: hash,
      adminId: employeeDto.adminId,
      perms: employeeDto.perms,
    };

    return this.adminService.addEmployee(newUser);
  }

  @Delete('delete/employee')
  @ApiBody({
    schema: {
      properties: {
        email: {type: "string", example: "user@example.com"}
      }
    }
  })
  async deleteEmployee(@Body('email') email: string){
    return this.adminService.deleteEmployee(email);
  }
}
