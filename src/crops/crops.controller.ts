import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpException } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateIrrigationDto } from './dto/create-irrigation.dto';
import { UpdateIrrigationDto } from './dto/update-irrigation.dto';
import { CreateFertiliserPesticideDTO } from './dto/create-fert-pest.dto';
import { UpdateFertiliserPesticideDTO } from './dto/update-fert-pest.dto';
import { CreateFinancialDto } from './dto/financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';

@ApiTags("CROPS")
@ApiBearerAuth()
@Controller('/api/v1/crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  private getUserFromRequest(req): any {
    return req.user;
  }

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
    const user = this.getUserFromRequest(req);
    const check = user.roles === "Admin";
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

@Post(':id/fertilizer-pestcide-applications/add')
@ApiOperation({
  summary: "Adds fertilizer and pesticide application record using crop id",
  description: "Adds fertilizer and pesticide application record using crop id"
})
async addFertiliserPesticide(@Param('id') id: string, @Body() createFertPestDto: CreateFertiliserPesticideDTO, @Request() req){
  const check = req.user.roles === "Admin";
  if(check){
    return this.cropsService.addFertiliserPesticide(id, createFertPestDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get(':adminId/fertilizer-pestcide-applications/farm')
@ApiOperation({
  summary: "Get all fertilizer-pestcide-applications records in a farm",
  description: "Get all fertilizer-pestcide-applications records in a farm using adminId",
})
async getAllFertPestApplicationsForFarm(@Param('adminId') adminId: string){
  return this.cropsService.getAllFertPestApplicationsForFarm(adminId);
}

@Get(':id/fertilizer-pestcide-applications/crop')
@ApiOperation({
  summary: "Gets all fertilizer-pestcide-applications records for a specific crop by _id",
  description: "Gets all fertilizer-pestcide-applications records for a specific crop by its mongoose.ObjectId _id",
})
async getAllFertPestApplicationsForCrop(@Param('id') id: string){
  return this.cropsService.getAllFertPestApplicationsForCrop(id);
}

@Get('fertilizer-pestcide-applications/:id')
@ApiOperation({
  summary: "Get a specific fertilizer-pestcide-applications record by its id",
  description: "Gets fertilizer-pestcide-applications record by its mongoose.ObjectId _id"
})
async getSpecificFertPestRecordById(@Param('id') id: string){
  return this.cropsService.getSpecificFertPestRecordById(id)
}

@Patch('fertilizer-pestcide-applications/:id')
@ApiOperation({
  summary: "Update a specific fertilizer-pestcide-applicationsrecord",
  description: "Update a specific fertilizer-pestcide-applications record using its mongoose.ObjectId _id",
})
async updateFertPestRecordById(@Param('id') id: string, @Body() updateFertPestDto: UpdateFertiliserPesticideDTO, @Request() req){
  const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.updateFertPestRecordById(id, updateFertPestDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
}

@Delete('fertilizer-pestcide-applications/:id')
@ApiOperation({
  summary: "Deletes a specific fertilizer-pestcide-applications record",
  description: "Deletes a specific fertilizer-pestcide-applications record using its mongoose.ObjectId _id",
})
async deleteFertPestRecordById(@Param('id') id: string, @Request() req){
  const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.deleteFertPestRecordById(id);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
}


/////////////////////FINANCIAL //////////////////////////////////

@Post(':id/financial')
@ApiOperation({
  summary: "Adds financial record for a crop",
  description: "Adds financial record for a crop using crop id",
})
async addFinancial(@Param('id') id: string, @Body() createFinancialDto: CreateFinancialDto, @Request() req){
  const check = req.user.roles === "Admin";
  if(check){
    return this.cropsService.createFinancialRecord(id, createFinancialDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get(':adminId/financial')
@ApiOperation({
  summary: "Get all financial records for a farm",
  description: "Get all financial records for a farm using adminId",
})
async getAllFinancialForFarm(@Param('adminId') adminId: string){
  return this.cropsService.getAllFinancialRecordsForFarm(adminId);
}

@Get(':id/financial/crop')
@ApiOperation({
  summary: "Gets all financial records for a specific crop by _id",
  description: "Gets all financial records for a specific crop by its mongoose.ObjectId _id",
})
async getAllFinancialForCrop(@Param('id') id: string){
  return this.cropsService.getAllFinancialRecordsForCrop(id);
}

@Get('financial/:id')
@ApiOperation({
  summary: "Get a specific financial record by its id",
  description: "Gets financial record by its mongoose.ObjectId _id"
})
async getSpecificFinancialRecordById(@Param('id') id: string){
  return this.cropsService.getSpecificFinancialRecordById(id)
}

@Patch('financial/:id')
@ApiOperation({
  summary: "Update a specific financial record",
  description: "Update a specific financial record using its mongoose.ObjectId _id",
})
async updateFinancialRecordById(@Param('id') id: string, @Body() updateFinancialDto: UpdateFinancialDto, @Request() req){
  const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.updateFinancialRecordById(id, updateFinancialDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
}

@Delete('financial/:id')
@ApiOperation({
  summary: "Deletes a specific financial record",
  description: "Deletes a specific financial record using its mongoose.ObjectId _id",
})
async deleteFinancialRecordById(@Param('id') id: string, @Request() req){
  const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.deleteFinancialRecordById(id);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
}



}