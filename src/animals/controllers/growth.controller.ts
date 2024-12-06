import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { AnimalGrowthService } from "../services/growth.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/roles/roles.guard";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { AnimalGrowthDTO } from "../dto/animalGrowth.dto";
import { UpdateAnimalGrowthDto } from "../dto/update-animalGrowth.dto";

@ApiTags('Animal Growth')
@ApiBearerAuth()
@Controller('/api/v1/animals')
@UseGuards(RolesGuard)
export class AnimalGrowthController {
    constructor(private readonly animalGrowthService: AnimalGrowthService) { }

    private getUserFromRequest(req): any {
        return req.user;
    }

    @Post('/:id/growth/add')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Create)
    @ApiOperation({
        summary: "Add growth record for an animal",
        description: "Add growth record for an animal. NB: id is the mongoose id of the animal"
    })
    async addGrowthRecord(@Param('id') id: string, @Body() growthRecord: AnimalGrowthDTO, @Request() req) {
        const user = this.getUserFromRequest(req);
        return await this.animalGrowthService.addGrowthRecord(user, id, growthRecord);
    }

    @Get('/growth/:id')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get growth records for an animal",
        description: "Get growth record. NB: id is the mongoose id of the growth record"
    })
    async getGrowthRecord(@Param('id') id: string) {
        return await this.animalGrowthService.getGrowthRecord(id);
    }

    @Get('/:id/growth/animal')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get growth records for an animal",
        description: "Get growth records for an animal. NB: id is the mongoose id of the animal. NB: page is the page number since we are using pagination, default page is 0 and the limit per page is 10"
    })
    async getGrowthRecordsForAnimal(@Param('id') id: string, @Query('page') page: number) {
        const pageNumber = page || 0;
        return await this.animalGrowthService.getGrowthRecordsForAnimal(id, pageNumber);
    }

    @Get('/growth/all/farm')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get all growth records for farm",
        description: "Get all growth records for farm. NB: page is the page number since we are using pagination, default page is 0 and the limit per page is 10"
    })
    async getGrowthRecordsForAdmin(@Query('page') page: number, @Request() req) {
        const adminId = this.getUserFromRequest(req).adminId;
        const pageNumber = page || 0;
        return await this.animalGrowthService.getGrowthRecordsForAdmin(adminId, pageNumber);
    }

    @Patch('/growth/:id/update')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Update)
    @ApiOperation({
        summary: "Update growth record for an animal",
        description: "Update growth record for an animal. NB: id is the mongoose id of the growth record"
    })
    async updateGrowthRecord(@Param('id') id: string, @Body() growthRecord: UpdateAnimalGrowthDto) {
        return await this.animalGrowthService.updateGrowthRecord(id, growthRecord);
    }

    @Delete('/growth/:id/delete')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Delete)
    @ApiOperation({
        summary: "Delete growth record for an animal",
        description: "Delete growth record for an animal. NB: id is the mongoose id of the growth record"
    })
    async deleteGrowthRecord(@Param('id') id: string) {
        return await this.animalGrowthService.deleteGrowthRecord(id);
    }


}