import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDTO } from './dto/create-reminder.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/roles/roles.decorators';
import { Permission } from 'src/roles/permissions.enum';
import { UpdateReminderDTO } from './dto/update-reminder.dto';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags("REMINDERS")
@ApiBearerAuth()
@Controller('/api/v1/reminders')
@UseGuards(RolesGuard)
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) { }

  private getUserFromRequest(req): any {
    return req.user;
  }

  //////////////////REMINDER/////////////////////////////

  @Post('add')
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
    return this.remindersService.createReminder(adminId, createReminderDto);
  }

  @Get('reminder/all')
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
    return this.remindersService.getReminderForCollection(user.adminId);
  }

  @Get('reminder/:id')
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
    return this.remindersService.getReminderById(id);
  }

  @Patch('reminder/:id')
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
    return this.remindersService.updateReminder(id, updateReminderDto);
  }

  @Delete('reminder/:id')
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
    return this.remindersService.deleteReminder(id);
  }

}
