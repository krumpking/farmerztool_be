import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Request,
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

  private getUserFromRequest(req): any{
    return req.user;
  }

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
    @Body() employeeDto: EmployeeDto, @Request() req
  ){
    const user = this.getUserFromRequest(req);
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(employeeDto.password, saltOrRounds);

    const newUser: EmployeeDto = {
      email: employeeDto.email,
      password: hash,
      perms: employeeDto.perms,
      role: employeeDto.role
    };

    const adminId = user.adminId;

    return this.adminService.addEmployee(adminId, newUser);
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
