import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Request,
  HttpException,
  Patch,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateFarmDto } from './dto/create-admin.dto';
// import { permission } from 'process';
import { EmployeeDto } from './dto/employee.dto';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permissions, Roles } from 'src/roles/roles.decorators';
import { Role } from 'src/roles/roles.enum';
import { Permission } from 'src/roles/permissions.enum';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@ApiTags("Admin Routes")
@ApiBearerAuth()
@Controller('/api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private getUserFromRequest(req): any{
    return req.user;
  }

  @Post('farm')
  @Roles(Role.Admin)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: "Endpoint for creating farm by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with create permission"
  })
  async addFarm(
    @Body() createFarmDto: CreateFarmDto, @Request() req
  ){
    const user = this.getUserFromRequest(req);
    const adminId = user?.adminId;
    const userId = user?.id;
    return this.adminService.addFarm(userId, adminId ,createFarmDto);
  }

  @Get('farms/all/adminId')
  @Roles(Role.Admin)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Endpoint for getting all farms by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with read permission"
  })
  async getFarms(@Param('adminId') adminId: string){
    return this.adminService.getFarms(adminId);
  }

  @Get('farm/:id')
  @Roles(Role.Admin)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Endpoint for getting farm by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with read permission"
  })
  async getFarm(@Param('id') id: string){
    return this.adminService.getFarm(id);
  }

  @Patch('farm/:id')
  @Roles(Role.Admin)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: "Endpoint for updating farm by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with update permission"
  })
  async updateFarm(
    @Param('id') id: string,
    @Body() updateFarmDto: UpdateFarmDto
  ){
    return this.adminService.updateFarm(id, updateFarmDto);
  }

  @Delete('farm/:id')
  @Roles(Role.Admin)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: "Endpoint for deleting farm by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with delete permission"
  })
  async deleteFarm(@Param('id') id: string){
    return this.adminService.deleteFarm(id);
  }

  @Get('employees/:adminId')
  @Roles(Role.Admin)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Endpoint for getting employees by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with read permission"
  })
  async getEmployees(@Param('adminId') adminId: string) {
    return this.adminService.getEmployees(adminId);
  }

  @Get('employee/:id')
  @Roles(Role.Admin)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Endpoint for getting employee by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with read permission"
  })
  async getEmployee(@Param('id') id: string) {
    return this.adminService.getEmployee(id);
  }

  @Post('add/employees')
  @Roles(Role.Admin)
  @Permissions(Permission.Create)
  @ApiOperation({
    
    summary: "Endpoint for adding employees by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with create permission"
  })
  async addEmployee(
    @Body() employeeDto: EmployeeDto, @Request() req
  ){
    const user = this.getUserFromRequest(req);

    if((employeeDto.password.trim()).length < 6){
      throw new HttpException("Password should be at least 6 characters", 421);
    }
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(employeeDto.password, saltOrRounds);

    const newUser: EmployeeDto = {
      email: employeeDto.email,
      password: hash,
      perms: employeeDto.perms,
      role: employeeDto.role
    };

    const adminId = user.adminId;

    return this.adminService.addEmployee(adminId, employeeDto.password, newUser);
  }

  @Patch('update/employee/:id')
  @Roles(Role.Admin)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: "Endpoint for updating employees by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with update permission"
  })
  async updateEmployee(
    @Param('id') id: string,
    @Body() employeeDto: UpdateEmployeeDto
  ){
    return this.adminService.updateEmployee(id, employeeDto);
  }

  @Delete('delete/employee/:id')
  @Roles(Role.Admin)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: "Endpoint for deleting employees by admin",
    description: "NB: Admin is the user who creates Account using registration path. Automitically he has all the priviledges. This path is only accessible to admins with delete permission"
  })
  async deleteEmployee(@Param('id') id: string){
    return this.adminService.deleteEmployee(id);
  }


}
