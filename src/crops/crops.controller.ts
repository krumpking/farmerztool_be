import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpException } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateIrrigationDto } from './dto/create-irrigation.dto';
import { UpdateIrrigationDto } from './dto/update-irrigation.dto';

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

@Post(':id/irrigation/add')
@ApiOperation({
  summary: "Adds irrigation record for a crop",
  description: "Adds irrigation record for a specific crop. That id should be the mongoose.ObjectId of that specific crop that needs an irrigation record"
})
async addIrrigation(@Param('id') id: string, @Body() createIrrigatioDto: CreateIrrigationDto, @Request() req){
  const check = req.user.roles === "Admin";
  if(check){
    return this.cropsService.addIrrigation(id, createIrrigatioDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get('irrigation/:id')
@ApiOperation({
  summary: "Get a specific irrigation record by its id",
  description: "Gets irrigation record by its mongoose.ObjectId _id"
})
async getIrrigationRecordById(@Param('id') id: string){
  return this.cropsService.getIrrigationRecordById(id)
}

@Get(':id/irrigation')
@ApiOperation({
  summary: "Gets all irigations for a specific crop by _id",
  description: "Gets all irigations for a specific crop by its mongoose.ObjectId _id",
})
async getIrrigationsForCrop(@Param('id') id: string){
  return this.cropsService.getIrrigationsForCrop(id);
}

@Get(':adminId/irrigations')
@ApiOperation({
  summary: "Get all irrigation records in a farm",
  description: "Get all irrigation records in a farm using adminId",
})
async getAllFarmIrrigations(@Param('adminId') adminId: string){
  return this.cropsService.getAllFarmIrrigations(adminId)
}

@Patch('irrigation/:id')
@ApiOperation({
  summary: "Update a specific irrigation record",
  description: "Update a specific irrigation record using its mongoose.ObjectId _id",
})
async updateIrrigation(@Param('id') id: string, @Body() updateIrrigationDto: UpdateIrrigationDto, @Request() req){
  const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.updateIrrigation(id, updateIrrigationDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
}

@Delete('irrigation/:id')
@ApiOperation({
  summary: "Deletes a specific irrigation record",
  description: "Deletes a specific irrigation record using its mongoose.ObjectId _id",
})
async deleteIrrigation(@Param('id') id: string, @Request() req){
  const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.deleteIrrigation(id);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
}








//////////////////// FERTILIZER$PESTICIDE /////////////////

}



