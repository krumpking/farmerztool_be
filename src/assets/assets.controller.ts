import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/roles.enum';
import { Permissions, Roles } from 'src/roles/roles.decorators';
import { Permission } from 'src/roles/permissions.enum';
import { CreateAssetDTO } from './dto/asset-management.dto';
import { UpdateAssetDto } from './dto/update-asset-management.dto';
import { CreateInspectionDTO } from './dto/asset-inspection.dto';
import { UpdateAssetInpsectionDto } from './dto/update-asset-inspection';
import { CreateAssetFinancialDTO } from './dto/asset-financial.dto';
import { UpdateAssetFinancial } from './dto/update-asset-financial.dto';
import { CreateAssetLocationDto } from './dto/asset-location.dto';
import { UpdateAssetLocationDto } from './dto/update-asset-location.dto';

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


  ////////////////////////ASSET INSPECTION//////////////////////////////////////


  @Post(':id/inspection/add')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Add inspection',
    description: 'Add inspection',
    responses: {
      201: {
        description: 'Inspection created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async createAssetInspection(@Param('id') id: string, @Body() createInspectionDto: CreateInspectionDTO, @Request() req) {
    const user = this.getUserFromRequest(req);
    return this.assetsService.createAssetInpsection(id, user.adminId, createInspectionDto);
  }


  @Get(':id/inspection/all')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all inspections for an asset',
    description: 'Get all inspections',
    responses: {
      200: {
        description: 'Inspections fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllInspectionRecordsForAsset(@Param('id') id: string) {
    return this.assetsService.getAllInspectionRecordsForAsset(id);
  }


  @Get('inspection/:id')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get inspection by id',
    description: 'Get inspection by id',
    responses: {
      200: {
        description: 'Inspection fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getSpecificInspection(@Param('id') id: string) {
    return this.assetsService.getSpecificInspection(id);
  }


  @Patch('inspection/:id/update')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update inspection',
    description: 'Update inspection',
    responses: {
      200: {
        description: 'Inspection updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateInspection(@Param('id') id: string, @Body() updateInspectionDto: UpdateAssetInpsectionDto) {
    return this.assetsService.updateInspection(id, updateInspectionDto);
  }


  @Delete('inspection/:id/delete')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete inspection',
    description: 'Delete inspection',
    responses: {
      200: {
        description: 'Inspection deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteInspection(@Param('id') id: string) {
    return this.assetsService.deleteInspection(id);
  }


  ////////////////////////ASSET FINANCIAL///////////////////////


  @Post(':id/financial/add')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Add financial',
    description: 'Add financial',
    responses: {
      201: {
        description: 'Financial created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async createAssetFinancial(@Param('id') id: string, @Body() createAssetFinancialDto: CreateAssetFinancialDTO) {
    return this.assetsService.createAssetFinancial(id, createAssetFinancialDto);
  }


  @Get(':id/financial/all')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all financials for an asset',
    description: 'Get all financials',
    responses: {
      200: {
        description: 'Financials fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllFinancialRecordsForAsset(@Param('id') id: string) {
    return this.assetsService.getAllFinancialRecordsForAsset(id);
  }


  @Get('financial/:id')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get financial by id',
    description: 'Get financial by id',
    responses: {
      200: {
        description: 'Financial fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getSpecificFinancial(@Param('id') id: string) {
    return this.assetsService.getSpecificFinancial(id);
  }


  @Patch('financial/:id/update')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update financial',
    description: 'Update financial',
    responses: {
      200: {
        description: 'Financial updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateFinancial(@Param('id') id: string, @Body() updateAssetFinancialDto: UpdateAssetFinancial) {
    return this.assetsService.updateFinancial(id, updateAssetFinancialDto);
  }

  @Delete('financial/:id/delete')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete financial',
    description: 'Delete financial',
    responses: {
      200: {
        description: 'Financial deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteFinancial(@Param('id') id: string) {
    return this.assetsService.deleteFinancial(id);
  }

  ///////////////ASSET LOCATION ////////////////////////////


  @Post(':id/location/add')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Add location',
    description: 'Add location',
    responses: {
      201: {
        description: 'Location created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async createAssetLocation(@Param('id') id: string, @Body() createAssetLocationDto: CreateAssetLocationDto, @Request() req) {
    const adminId = this.getUserFromRequest(req).adminId;
    return this.assetsService.createAssetLocation(id, adminId, createAssetLocationDto);
  }

  @Get(':id/location/all')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all locations for an asset',
    description: 'Get all locations',
    responses: {
      200: {
        description: 'Locations fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllLocationsForAsset(@Param('id') id: string) {
    return this.assetsService.getAllLocationsForAsset(id);
  }


  @Get('location/:id')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get location by id',
    description: 'Get location by id',
    responses: {
      200: {
        description: 'Location fetched successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getSpecificLocation(@Param('id') id: string) {
    return this.assetsService.getSpecificLocation(id);
  }


  @Patch('location/:id/update')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update location',
    description: 'Update location',
    responses: {
      200: {
        description: 'Location updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateLocation(@Param('id') id: string, @Body() updateAssetLocationDto: UpdateAssetLocationDto) {
    return this.assetsService.updateLocation(id, updateAssetLocationDto);
  }

  @Delete('location/:id/delete')
  @Roles(Role.Admin, Role.AssetManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete location',
    description: 'Delete location',
    responses: {
      200: {
        description: 'Location deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteLocation(@Param('id') id: string) {
    return this.assetsService.deleteLocation(id);
  }



}
