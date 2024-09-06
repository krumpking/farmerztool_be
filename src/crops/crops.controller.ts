import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpException } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("CROPS")
@ApiBearerAuth()
@Controller('/api/v1/crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  ////////////////////////////// CROPS //////////////////////////////////////////

  @Post('add')
  @ApiOperation({
    summary: "Adds new crop record",
    description: "Creates new crop record",
    responses: {
      201: {
        description: 'Animal created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async addCrop(@Body() createCropDto: CreateCropDto, @Request() req) {
    const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.addCrop(createCropDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Get()
  @ApiOperation({
    summary: "Gets all crop records",
    description: "Gets all crop records",
  })
  async getCrops() {
    return this.cropsService.getCrops();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Gets a single crop by id",
    description: "Gets a single crop by id",
  })
  async getCrop(@Param('id') id: string){
    return this.cropsService.getCrop(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Updates crop record by id",
    description: "Updates crop record by id",
  })
  async updateCrop(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto, @Request() req){
    const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.updateCrop(id, updateCropDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Deletes crop record by id",
    description: "Deletes crop record by id",
  })
  async deleteCrop(@Param('id') id: string, @Request() req){
    const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.deleteCrop(id);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

///////////////////////////////////// IRRIGATION //////////////////////////////////////////////



}



