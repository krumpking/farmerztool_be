import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpException, UseGuards } from '@nestjs/common';
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
import { CropActivityDto } from './dto/activity.dto';
import { CreatePestDiseaseIssueDto } from './dto/pest-disease.dto';
import { UpdatePestDiseaseIssueDto } from './dto/update-pest-disease.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Permissions, Roles } from 'src/roles/roles.decorators';
import { Role } from 'src/roles/roles.enum';
import { Permission } from 'src/roles/permissions.enum';

@ApiTags("CROPS")
@ApiBearerAuth()
@Controller('/api/v1/crops')
@UseGuards(RolesGuard)
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  private getUserFromRequest(req): any {
    return req.user;
  }

  ////////////////////////////// CROPS //////////////////////////////////////////

  @Post('add')
  @Roles(Role.FarmManager, Role.Admin)
  @Permissions(Permission.Create)
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
    // const check = user.roles === "Admin";
    if (true) {
      const adminId = user.adminId;
      
      return this.cropsService.addCrop(adminId ,createCropDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Get()
  @ApiOperation({
    summary: "Gets all crop records",
    description: "Gets all crop records",
  })
  async getCrops(
    @Request() req
  ) {
    const user = this.getUserFromRequest(req);
    const adminId = user.adminId;

    return this.cropsService.getCrops(adminId);
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
  const user = this.getUserFromRequest(req);
  const check = user.roles === "Admin";
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
  const user = this.getUserFromRequest(req);
  const check = user.roles === "Admin";
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
  const user = this.getUserFromRequest(req);
  const check = user.roles === "Admin";
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
  const user = this.getUserFromRequest(req);
  const check = user.roles === "Admin";
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


////////////////////////////ACTIVITY//////////////////////////////////////

@Post(':id/activity')
@ApiOperation({
  summary: "Adds activity record for a crop",
  description: "Adds activity record for a crop using crop id",
})
async addActivity(@Param('id') id: string, @Body() createActivityDto: CropActivityDto, @Request() req){
  const user = this.getUserFromRequest(req);
  const check = user.roles === "Admin";
  if(check){
    const adminId = user.adminId;
    
    return this.cropsService.createActivityRecord(id, adminId, createActivityDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get(':adminId/activity')
@ApiOperation({
  summary: "Get all activity records for a farm",
  description: "Get all activity records for a farm using adminId",
})
async getAllActivityForFarm(@Param('adminId') adminId: string){
  return this.cropsService.getAllActivityRecordsForFarm(adminId);
}


@Get(':id/activity')
@ApiOperation({
  summary: "Get all activity records for a crop",
  description: "Get all activity records for a crop using crop id",
})
async getAllActivityForCrop(@Param('id') id: string){
  return this.cropsService.getAllActivityRecordsForCrop(id);
}

@Get('activity/:id')
@ApiOperation({
  summary: "Get a specific activity record by its id",
  description: "Get a specific activity record by its mongoose.ObjectId _id",
})
async getSpecificActivityRecordById(@Param('id') id: string){
  return this.cropsService.getSpecificActivityRecordById(id)  
}

@Patch('activity/:id')
@ApiOperation({
  summary: "Update a specific activity record",
  description: "Update a specific activity record using its mongoose.ObjectId _id",
})
async updateActivityRecordById(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto, @Request() req){
  const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.updateActivityRecordById(id, updateActivityDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
}

@Delete('activity/:id')
@ApiOperation({
  summary: "Deletes a specific activity record",
  description: "Deletes a specific activity record using its mongoose.ObjectId _id",
})
async deleteActivityRecordById(@Param('id') id: string, @Request() req){
  const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.deleteActivityRecordById(id);
    } else {
      throw new HttpException("Unauthorised", 401);
    }

}

  ////////////////////////////////////PestDiseaseIssue////////////////////////////////

  @Post(':id/pest-disease-issue')
  @ApiOperation({
    summary: "Add a pest disease issue for a crop",
    description: "Add a pest disease issue for a crop using crop id",
  })
  async addPestDiseaseIssue(@Param('id') id: string, @Body() createPestDiseaseIssueDto: CreatePestDiseaseIssueDto, @Request() req){
    const user = this.getUserFromRequest(req);
    const check = user.roles === "Admin";
    if(check){
      const adminId = user.adminId;
      return this.cropsService.createPestDiseaseIssue(id, adminId, createPestDiseaseIssueDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Get(':adminId/pest-disease-issue')
  @ApiOperation({
    summary: "Get all pest disease issues for a farm",
    description: "Get all pest disease issues for a farm using adminId",
  })
  async getAllPestDiseaseIssuesForFarm(@Param('adminId') adminId: string){
    return this.cropsService.getAllPestDiseaseIssueForFarm(adminId);
  }


  @Get(':id/pest-disease-issue')
  @ApiOperation({
    summary: "Get all pest disease issues for a crop",
    description: "Get all pest disease issues for a crop using crop id",
  })
  async getAllPestDiseaseIssuesForCrop(@Param('id') id: string){
    return this.cropsService.getAllPestDiseaseIssueForCrop(id);
  }

  @Get('pest-disease-issue/:id')
  @ApiOperation({
    summary: "Get a specific pest disease issue by its id",
    description: "Get a specific pest disease issue by its mongoose.ObjectId _id",
  })
  async getSpecificPestDiseaseIssueById(@Param('id') id: string){
    return this.cropsService.getPestDiseaseIssueById(id)  
  }

  @Patch('pest-disease-issue/:id')
  @ApiOperation({
    summary: "Update a specific pest disease issue",
    description: "Update a specific pest disease issue using its mongoose.ObjectId _id",
  })
  async updatePestDiseaseIssueById(@Param('id') id: string, @Body() updatePestDiseaseIssueDto: UpdatePestDiseaseIssueDto, @Request() req){
    const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.updatePestDiseaseIssueById(id, updatePestDiseaseIssueDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Delete('pest-disease-issue/:id')
  @ApiOperation({
    summary: "Deletes a specific pest disease issue",
    description: "Deletes a specific pest disease issue using its mongoose.ObjectId _id",
  })
  async deletePestDiseaseIssueById(@Param('id') id: string, @Request() req){
    const check = req.user.roles === "Admin";
    if (check) {
      return this.cropsService.deletePestDiseaseIssueById(id);
    } else {
      throw new HttpException("Unauthorised", 401);
    }

  }



}