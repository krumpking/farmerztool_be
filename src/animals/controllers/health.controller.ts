import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { AnimalHealthService } from "../services/health.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/roles/roles.guard";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { CreateAnimalHealthDto } from "../dto/animalHealthRecords.dto";
import { UpdateAnimalHealthDto } from "../dto/update-AnimalHealth.dto";

@ApiTags('Animal Health')
@ApiBearerAuth()
@Controller('/api/v1/animals')
@UseGuards(RolesGuard)
export class AnimalHealthController {
    constructor(
        private readonly animalHealthService: AnimalHealthService
    ) { }

    private getUserFromRequest(req): any {
        return req.user;
    }

    @Post('/:id/health/add')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Create)
    @ApiOperation({
        summary: "Add health record for an animal",
        description: "Add health record for an animal. NB: id is the mongoose id of the animal"
    })
    async addHealthRecord(@Param('id') id: string, @Request() req, @Body() createAnimalHealthDto: CreateAnimalHealthDto) {
        const user = this.getUserFromRequest(req);
        return this.animalHealthService.addHealthRecord(user, id, createAnimalHealthDto);
    }

    @Get('/health/:id')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get health record for an animal",
        description: "Get health record for an animal. NB: id is the mongoose id of the animal health record"
    })
    async getHealthRecord(@Param('id') id: string) {
        return this.animalHealthService.getHealthRecord(id);
    }

    @Get('/:id/health/animal')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get all health records for an animal",
        description: "Get all health records for an animal. id is the mongoose id of the animal. NB: I added the page query, query name should be page and the example url is like this api/v1/animals/id/health/animal?page=1. Our page starts at zero and the limit is 10 records per page, so in the FE you can implement a way for the user to go to the next page while increasing the page number and vise versa"
    })
    async getAnimalHealthRecords(@Param('id') id: string, @Query('page') page: number) {
        const pageNumber = page || 0;
        return this.animalHealthService.getAllHealthRecordsForAnimal(id, pageNumber);
    }


    @Get('/health/all-farm')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get all health records for admin",
        description: "Get all health records for admin. NB: I added the page query, query name should be page and the example url is like this api/v1/animals/health/all-farm?page=1. Our page starts at zero and the limit is 10 records per page, so in the FE you can implement a way for the user to go to the next page while increasing the page number and vise versa"
    })
    async getAnimalHealthRecordsForAdmin(@Query('page') page: number, @Request() req) {
        const user = this.getUserFromRequest(req);
        const pageNumber = page || 0;
        return this.animalHealthService.getAllHealthRecordsForAnimal(user?.adminId, pageNumber);
    }

    @Patch('/health/:id/update')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Update)
    @ApiOperation({
        summary: "Update health record for an animal",
        description: "Update health record for an animal. NB: id is the mongoose id of the animal health record"
    })
    async updateHealthRecord(@Param('id') id: string, @Body() updateAnimalHealthDto: UpdateAnimalHealthDto) {
        return this.animalHealthService.updateHealthRecord(id, updateAnimalHealthDto);
    }


    @Delete('/health/:id/delete')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Delete)
    @ApiOperation({
        summary: "Delete health record for an animal",
        description: "Delete health record for an animal. NB: id is the mongoose id of the animal health record"
    })
    async deleteHealthRecord(@Param('id') id: string) {
        return this.animalHealthService.deleteHealthRecord(id);
    }




}

