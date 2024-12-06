import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { AnimalAssetService } from "../services/assets.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/roles/roles.guard";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { CreateAnimalAssetDto } from "../dto/animalAsset.dto";
import { UpdateAnimalAssetDTO } from "../dto/updateAnimalAsset.dto";

@ApiTags('Animal Assets')
@ApiBearerAuth()
@Controller('/api/v1/animals')
@UseGuards(RolesGuard)
export class AnimalAssetController {
    constructor(private readonly animalAssetService: AnimalAssetService) { }

    private getUserFromRequest(req): any {
        return req.user;
    }

    @Post('/:id/assets/add')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Create)
    @ApiOperation({
        summary: "Add asset record for an animal",
        description: "Add asset record for an animal. NB: id is the mongoose id of the animal"
    })
    async addAsset(@Param('id') id: string, @Body() assetRecord: CreateAnimalAssetDto, @Request() req) {
        const user = this.getUserFromRequest(req);
        return await this.animalAssetService.addAsset(user, id, assetRecord);
    }

    @Get('/assets/:id')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get asset record",
        description: "Get asset record. NB: id is the mongoose id of the asset"
    })
    async getAssetRecord(@Param('id') id: string) {
        return await this.animalAssetService.getAssetRecord(id);
    }

    @Get('/:id/assets/animal')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get asset records for an animal",
        description: "Get asset records for an animal. NB: id is the mongoose id of the animal. NB: page is the page number since we are using pagination, default page is 0 and the limit per page is 10"
    })
    async getAssetsForAnimal(@Param('id') id: string, @Query('page') page: number) {
        const pageNumber = page || 0;
        return await this.animalAssetService.getAssetsForAnimal(id, pageNumber);
    }

    @Get('/assets/all/farm')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: "Get all asset records for farm",
        description: "Get all asset records for farm. NB: page is the page number since we are using pagination, default page is 0 and the limit per page is 10"
    })
    async getAssetsForAdmin(@Query('page') page: number, @Request() req) {
        const adminId = this.getUserFromRequest(req).adminId;
        const pageNumber = page || 0;
        return await this.animalAssetService.getAssetsForAdmin(adminId, pageNumber);
    }

    @Patch('/assets/:id/update')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Update)
    @ApiOperation({
        summary: "Update asset record for an animal",
        description: "Update asset record for an animal. NB: id is the mongoose id of the asset"
    })
    async updateAsset(@Param('id') id: string, @Body() assetRecord: UpdateAnimalAssetDTO) {
        return await this.animalAssetService.updateAsset(id, assetRecord);
    }

    @Delete('/assets/:id/delete')
    @Roles(Role.Admin, Role.AnimalManager, Role.Veterinarian, Role.FarmManager)
    @Permissions(Permission.Delete)
    @ApiOperation({
        summary: "Delete asset record for an animal",
        description: "Delete asset record for an animal. NB: id is the mongoose id of the asset"
    })
    async deleteAsset(@Param('id') id: string) {
        return await this.animalAssetService.deleteAsset(id);
    }


}