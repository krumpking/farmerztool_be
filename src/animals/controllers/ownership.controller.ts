import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { AnimalOwnershipService } from "../services/ownership.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/roles/roles.guard";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { AnimalOwnershipDTO } from "../dto/animalOwnership.dto";
import { UpdateAnimalOwnershipDTO } from "../dto/updateAnimalOwnership.dto";


@ApiTags('Animal Ownership')
@ApiBearerAuth()
@Controller('/api/v1/animals')
@UseGuards(RolesGuard)
export class AnimalOwnershipController {
    constructor(private readonly animalOwnershipService: AnimalOwnershipService) { }

    private getUserFromRequest(req): any {
        return req.user;
    }

    @Post('/:id/ownership/add')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Create)
    @ApiOperation({
        summary: "Add ownership record for an animal",
        description: "Add ownership record for an animal. NB: id is the mongoose id of the animal"
    })
    async addOwnershipRecord(@Param('id') id: string, @Body() ownershipRecord: AnimalOwnershipDTO, @Request() req) {
        const user = this.getUserFromRequest(req);
        return await this.animalOwnershipService.addOwnership(user, id, ownershipRecord);
    }

    @Get('/ownership/:id')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get ownership records for an animal",
        description: "Get ownership record. NB: id is the mongoose id of the ownership record"
    })
    async getOwnershipRecord(@Param('id') id: string) {
        console.log(id);
        return await this.animalOwnershipService.getOwnershipRecord(id);
    }

    @Get('/:id/ownership/animal')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get ownership records for an animal",
        description: "Get ownership records for an animal. NB: id is the mongoose id of the animal. NB: page is the page number since we are using pagination, default page is 0 and the limit per page is 10"
    })
    async getOwnershipRecordsForAnimal(@Param('id') id: string, @Query('page') page: number) {
        const pageNumber = page || 0;
        return await this.animalOwnershipService.getOwnershipRecordsForAnimal(id, pageNumber);
    }

    @Get('/ownership/all/farm')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get all ownership records for farm",
        description: "Get all ownership records for farm. NB: page is the page number since we are using pagination, default page is 0 and the limit per page is 10"
    })
    async getOwnershipRecordsForAdmin(@Query('page') page: number, @Request() req) {
        const adminId = this.getUserFromRequest(req).adminId;
        const pageNumber = page || 0;
        return await this.animalOwnershipService.getOwnershipRecordsForAdmin(adminId, pageNumber);
    }

    @Patch('/ownership/:id/update')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Update)
    @ApiOperation({
        summary: "Update ownership record for an animal",
        description: "Update ownership record for an animal. NB: id is the mongoose id of the ownership record"
    })
    async updateOwnershipRecord(@Param('id') id: string, @Body() ownershipRecord: UpdateAnimalOwnershipDTO) {
        return await this.animalOwnershipService.updateOwnershipRecord(id, ownershipRecord);
    }

    @Delete('/ownership/:id/delete')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Delete)
    @ApiOperation({
        summary: "Delete ownership record for an animal",
        description: "Delete ownership record for an animal. NB: id is the mongoose id of the ownership record"
    })
    async deleteOwnershipRecord(@Param('id') id: string) {
        return await this.animalOwnershipService.deleteOwnershipRecord(id);
    }
}