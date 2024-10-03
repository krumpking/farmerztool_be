import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { HatcheryService } from './hatchery.service';
import { CreateHatcheryDto } from './dto/create-hatchery.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Permissions, Roles } from 'src/roles/roles.decorators';
import { Role } from 'src/roles/roles.enum';
import { Permission } from 'src/roles/permissions.enum';
import { UpdateHatcheryDto } from './dto/update-hatchery.dto';
import { CreateReminderDTO } from './dto/create-reminder.dto';
import { UpdateReminderDTO } from './dto/update-reminder.dto';



@ApiTags("HATCHERY")
@ApiBearerAuth()
@Controller('/api/v1/hatchery')
@UseGuards(RolesGuard)
export class HatcheryController {
  constructor(private readonly eggService: HatcheryService) {}

  private getUserFromRequest(req): any {
    return req.user;
  }

  /////////////////////////////////EGGS///////////////////////////////////////////////

  @Post()
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: "Adds new egg record",
    description: "Creates new egg record",
    responses: {
      201: {
        description: 'Egg created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async createEgg(@Body() createEggDto: CreateHatcheryDto, @Request() req) {
    const user = this.getUserFromRequest(req);
    const adminId = user.adminId;
    return this.eggService.createEgg(adminId, createEggDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all egg records",
    description: "Get all egg records",
    responses: {
      200: {
        description: 'Eggs fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getEggs(@Request() req) {
    const user = this.getUserFromRequest(req)
    return this.eggService.getEggs(user.adminId);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    
    summary: "Get a single egg record",
    description: "Get a single egg record",
    responses: {
      200: {
        description: 'Egg fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getEgg(@Param('id') id: string) {
    return this.eggService.getEggById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: "Update egg record",
    description: "Update egg record",
    responses: {
      200: {
        description: 'Egg updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateEgg(@Param('id') id: string, @Body() updateEggDto: UpdateHatcheryDto) {
    return this.eggService.updateEgg(id, updateEggDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: "Delete egg record",
    description: "Delete egg record",
    responses: {
      200: {
        description: 'Egg deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteEgg(@Param('id') id: string) {
    return this.eggService.deleteEgg(id);
  }


  //////////////////REMINDER/////////////////////////////

  @Post('reminder/add')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: "Add reminder",
    description: "Add reminder",
    responses: {
      201: {
        description: 'Reminder created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async addReminder(@Body() createReminderDto: CreateReminderDTO, @Request() req) {
    const user = this.getUserFromRequest(req);
    const adminId = user.adminId;
    return this.eggService.createReminder(adminId, createReminderDto);
  }

  @Get('reminder/all')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all reminders",
    description: "Get all reminders",
    responses: {
      200: {
        description: 'Reminders fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getReminders(@Request() req) {
    const user = this.getUserFromRequest(req)
    return this.eggService.getReminderForCollection(user.adminId);
  }

  @Get('reminder/:id')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get a single reminder",
    description: "Get a single reminder",
    responses: {
      200: {
        description: 'Reminder fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getReminder(@Param('id') id: string) {
    return this.eggService.getReminderById(id);
  }

  @Patch('reminder/:id')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: "Update reminder",
    description: "Update reminder",
    responses: {
      200: {
        description: 'Reminder updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateReminder(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDTO) {
    return this.eggService.updateReminder(id, updateReminderDto);
  }

  @Delete('reminder/:id')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: "Delete reminder",
    description: "Delete reminder",
    responses: {
      200: {
        description: 'Reminder deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteReminder(@Param('id') id: string) {
    return this.eggService.deleteReminder(id);
  }

  //////////////////// KPIs///////////////////////////////

  @Get('kpi/egg-performance')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get egg performance",
    description: "Get egg performance. NB: Please note that here are using query params so we have to do this in the url using postman url= .../kpi/customer-performance?animalType=Chicken&startEnd=2022-01-01&endDate=2024-01-01. NB: date format is %Y-%m-%d",
    responses: {
      200: {
        description: 'Egg performance fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getEggPerformance(@Query('animalType') animalType: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    const dateRange = {start: new Date(startDate), end: new Date(endDate) };
    const hatchRate = await this.eggService.getEggHatchRate(animalType, dateRange);
    const rejectionRate = await this.eggService.getRejectionRate(animalType, dateRange);
    const daysToHatch = await this.eggService.getDaysToHatch(animalType, dateRange);
    const hatchAccuracy = await this.eggService.getAccuracyOnHatching(animalType, 21, dateRange); // assuming 21 days for chicks

    return {
      hatchRate,
      rejectionRate,
      daysToHatch,
      hatchAccuracy
    };
    
  }

  @Get('kpi/customer-performance')
  @Roles(Role.Admin, Role.EggsHatcheryManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get customer performance",
    description: "Get customer performance. NB: Please note that here are using query params so we have to do this in the url using postman url= .../kpi/customer-performance?startEnd=2022-01-01&endDate=2024-01-01. NB: date format is %Y-%m-%d",
    responses: {
      200: {
        description: 'Customer performance fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
    })
    async getCustomerPerformance(@Query('startDate') startDate: string, @Query('endDate') endDate: string, @Request() req) {
      const adminId = this.getUserFromRequest(req).adminId;

      const dateRange = { start: new Date(startDate), end: new Date(endDate) };
      return await this.eggService.getCustomerSuccessRate(adminId,dateRange);
    }

    @Get('kpi/total-eggs-per-day/farm')
    @Roles(Role.Admin, Role.EggsHatcheryManager)
    @Permissions(Permission.Read)
    @ApiOperation({
      summary: "Get total eggs per day",
      description: "Get total eggs per day",
      responses: {
        200: {
          description: 'Total eggs per day fetched successfully',
        },
        401: {
          description: 'Unauthorized',
        },
      },
    })
    async getTotalEggsPerDay(@Request() req) {
      const user = this.getUserFromRequest(req);
      const adminId = user.adminId;
      return this.eggService.getNumberOfEggsPerDayForAdmin(adminId);
    }

  }
  
