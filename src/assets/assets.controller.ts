import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/roles.enum';
import { Permissions, Roles } from 'src/roles/roles.decorators';
import { Permission } from 'src/roles/permissions.enum';
import { CreateAssetDTO } from './dto/asset-management.dto';
import { UpdateAssetDto } from './dto/update-asset-management.dto';

@ApiTags("ASSETS")
@ApiBearerAuth()
@Controller('/api/v1/assets')
@UseGuards(RolesGuard)

export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  private getUserFromRequest(req): any {
    return req.user;
  }

  //////////////////////ASSET MANAGEMENT/////////////////////////////

  @Post('add')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Add asset',
    description: 'Add asset',
    responses: {
      201: {
        description: 'Asset created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async createAsset(@Body() createAssetDto: CreateAssetDTO, @Request() req){
    const user = this.getUserFromRequest(req);
    return this.assetsService.createAsset(user.adminId, createAssetDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all assets',
    description: 'Get all assets',
    responses: {
      200: {
        description: 'Assets fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllAssetsForAdmin(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.assetsService.getAllAssetsForAdmin(user.adminId);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get asset by id',
    description: 'Get asset by id',
    responses: {
      200: {
        description: 'Asset fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getSpecificAssetById(@Param('id') id: string) {
    return this.assetsService.getSpecificAssetById(id);
  }

  @Patch(':id/update')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update asset',
    description: 'Update asset',
    responses: {
      200: {
        description: 'Asset updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateAsset(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.updateAsset(id, updateAssetDto);
  }

  @Delete(':id/delete')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete asset',
    description: 'Delete asset',
    responses: {
      200: {
        description: 'Asset deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteAsset(@Param('id') id: string) {
    return this.assetsService.deleteAsset(id);
  }





}
