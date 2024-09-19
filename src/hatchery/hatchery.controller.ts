import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { HatcheryService } from './hatchery.service';
import { CreateHatcheryDto } from './dto/create-hatchery.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Permissions, Roles } from 'src/roles/roles.decorators';
import { Role } from 'src/roles/roles.enum';
import { Permission } from 'src/roles/permissions.enum';
import { UpdateHatcheryDto } from './dto/update-hatchery.dto';



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
 
}
