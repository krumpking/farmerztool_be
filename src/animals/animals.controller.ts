import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  HttpException,
  Patch,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { CreateBreedingDto } from './dto/breeding.dto';
import { CreateFeedDto } from './dto/feed.dto';
import { CreateVaccinationDto } from './dto/vaccination.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { UpdateBreedingDto } from './dto/updateBreeding.dto';
import { UpdateFeedDto } from './dto/updateFeed.dto';
import { UpdateVaccinationDto } from './dto/updateVaccination.dto';
import { CreateProductionDto } from './dto/production.dto';




@ApiTags("ANIMALS")
@ApiBearerAuth()
@Controller('/api/v1/animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}


  /////////////////////// ANIMALS //////////////////////////////////////////////////////
  @Post('add')
  @ApiOperation({
    summary: 'Create a new animal',
    description: 'Creates a new animal',
    responses: {
      201: {
        description: 'Animal created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async create(@Body() createAnimalDto: CreateAnimalDto, @Request() req) {

    const check = req.user.roles === "Admin";
    console.log(req.user.roles);
    
    if (check) {
      return this.animalsService.addAnimal(createAnimalDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Get(':animalId')
  @ApiOperation({
    summary: 'Get an animal by ID',
    description: 'Retrieves an animal by ID',
    responses: {
      200: {
        description: 'Animal retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAnimal(@Param('animalId') animalId: string, @Request() req) {
    if(req.user.roles === "Admin"){
      return this.animalsService.getAnimal(animalId);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Get('all/:adminId')
  @ApiOperation({
    summary: 'Get all animals for a specific admin',
    description: 'Retrieves all animals for a specific admin',
    responses: {
      200: {
        description: 'Animals retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllAnimals(@Param('adminId') adminId: string , @Request() req) {
    if(req.user.roles === "Admin"){
      return this.animalsService.getAllMyAnimals(adminId);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Patch(':animalId')
  @ApiOperation({
    summary: 'Update an animal',
    description: 'Updates an animal',
    responses: {
      200: {
        description: 'Animal updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateAnimal(@Param('animalId') animalId: string, @Request() req, @Body() updateAnimalDto: UpdateAnimalDto){
    if(req.user.roles === "Admin"){
      return this.animalsService.updateAnimal(animalId, updateAnimalDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Delete(':animalId')
  @ApiOperation({
    summary: 'Delete an animal',
    description: 'Deletes an animal',
    responses: {
      200: {
        description: 'Animal deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteAnimal(@Param('animalId') animalId: string, @Request() req){
    if(req.user.roles === "Admin"){
      return this.animalsService.deleteAnimal(animalId);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  ////////////////////////// BREEDING //////////////////////////////////////////////

@Post('breeding/add')
@ApiOperation({
  summary: 'Create new breeding information',
  description: 'Creates new breeding information',
  responses: {
    201: {
      description: 'Breeding information created successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async createBreeding(@Body() createBreedingDto: CreateBreedingDto, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.addBreedingInfo(createBreedingDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get('breeding/:animalId')
@ApiOperation({
  summary: 'Get breeding information for an animal',
  description: 'Retrieves breeding information for an animal',
  responses: {
    200: {
      description: 'Breeding information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async getBreedingInfo(@Param('animalId') animalId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.getAnimalBreedingInfo(animalId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get('breeding/all/:adminId')
@ApiOperation({
  summary: 'Get all breeding information for an admin',
  description: 'Retrieves all breeding information for an admin',
  responses: {
    200: {
      description: 'Breeding information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async getAllBreedingInfo(@Param('adminId') adminId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.getAllBreedingInfo(adminId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Patch('breeding/:animalId')
@ApiOperation({
  summary: 'Update breeding information for an animal',
  description: 'Updates breeding information for an animal',
  responses: {
    200: {
      description: 'Breeding information updated successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async updateBreeding(@Param('animalId') animalId: string, @Request() req, @Body() updateBreedingDto: UpdateBreedingDto) {
  if (req.user.roles === "Admin") {
    return this.animalsService.updateBreedingInfo(updateBreedingDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Delete('breeding/:animalId')
@ApiOperation({
  summary: 'Delete breeding information for an animal',
  description: 'Deletes breeding information for an animal',
  responses: {
    200: {
      description: 'Breeding information deleted successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async deleteBreeding(@Param('animalId') animalId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.deleteBreedingInfo(animalId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

 ////////////////// FEEDING /////////////////////////////////////////////////////////

 @Post('feeding/add/info')
 @ApiOperation({
  summary: 'Create new feeding information',
  description: 'Creates new feeding information',
  responses: {
    201: {
      description: 'Feeding information created successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async createFeeding(@Body() createFeedingDto: CreateFeedDto, @Request() req) {
   if (req.user.roles === "Admin") {
     return this.animalsService.addFeed(createFeedingDto);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }

 @Get('feeding/:feedId')
 @ApiOperation({
  summary: 'Get feeding information for a feed',
  description: 'Retrieves feeding information for a feed',
  responses: {
    200: {
      description: 'Feeding information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async getFeedingInfo(@Param('feedId') feedId: string, @Request() req) {
   if (req.user.roles === "Admin") {
     return this.animalsService.getFeedingInfo(feedId);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }

 @Get('feeding/all/:adminId')
 @ApiOperation({
  summary: 'Get all feeding information for an admin',
  description: 'Retrieves all feeding information for an admin',
  responses: {
    200: {
      description: 'Feeding information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async getAllFeedingInfo(@Param('adminId') adminId: string, @Request() req) {
   if (req.user.roles === "Admin") {
     return this.animalsService.getAllAnimalFeedingInfo(adminId);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }

 @Patch('feeding/:feedId')
 @ApiOperation({
  summary: 'Update feeding information for a feed',
  description: 'Updates feeding information for a feed',
  responses: {
    200: {
      description: 'Feeding information updated successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async updateFeeding(@Param('feedId') feedId: string, @Request() req, @Body() updateFeedingDto: UpdateFeedDto) {
   if (req.user.roles === "Admin") {
     return this.animalsService.updateFeed(feedId, updateFeedingDto);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }

 @Delete('feeding/:feedId')
 @ApiOperation({
  summary: 'Delete feeding information for a feed',
  description: 'Deletes feeding information for a feed',
  responses: {
    200: {
      description: 'Feeding information deleted successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async deleteFeeding(@Param('feedId') feedId: string, @Request() req) {
   if (req.user.roles === "Admin") {
     return this.animalsService.deleteFeed(feedId);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }


 /////////////////////////VACCINATION/////////////////////////////////////////////

 @Post('vaccination/add')
 @ApiOperation({
  summary: 'Create new vaccination information',
  description: 'Creates new vaccination information',
  responses: {
    201: {
      description: 'Vaccination information created successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async addVaccination(@Body() createVaccinationDto: CreateVaccinationDto){
  return this.animalsService.addVaccination(createVaccinationDto)
 }

 @Get('vaccination/all/farm/:adminId')
 @ApiOperation({
  summary: 'Get all vaccination information for a farm',
  description: 'Retrieves all vaccination information for a farm',
  responses: {
    200: {
      description: 'Vaccination information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async getAllVaccinesInFarm(@Param('adminId') adminId: string){
  return this.animalsService.getAllVaccinesInFarm(adminId);
 }

 @Get('vaccination/all/animal/:animalId')
 @ApiOperation({
  summary: 'Get all vaccination information for an animal',
  description: 'Retrieves all vaccination information for an animal',
  responses: {
    200: {
      description: 'Vaccination information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async getAllVaccinesPerAnimal(@Param('animalId') animalId: string){
  return this.animalsService.getAllVaccinesPerAnimal(animalId);
 }

 @Get('vaccination/:Id')
 @ApiOperation({
  summary: 'Get specific vaccination information',
  description: 'Retrieves specific vaccination information',
  responses: {
    200: {
      description: 'Vaccination information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async getSpecificVaccine(@Param('Id') Id: string){
  return this.animalsService.getSpecificVaccine(Id);
 }

 @Patch('vaccination/:Id')
 @ApiOperation({
  summary: 'Update vaccination information',
  description: 'Updates vaccination information',
  responses: {
    200: {
      description: 'Vaccination information updated successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async updateVaccine(@Param('Id') Id: string, @Body() updateVaccinationDto: UpdateVaccinationDto){
  return this.animalsService.updateVaccine(Id, updateVaccinationDto);
 }

 @Delete('vaccination/:Id')
 @ApiOperation({
  summary: 'Delete vaccination information',
  description: 'Deletes vaccination information',
  responses: {
    200: {
      description: 'Vaccination information deleted successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
 async deleteVaccine(@Param('Id') Id: string){
  return this.animalsService.deleteAnimal(Id);
 }

/////////////////////////PRODUCTION//////////////////////////////////////

@Post('production/add')
@ApiOperation({
  summary: 'Create new production information',
  description: 'Creates new production information',
  responses: {
    201: {
      description: 'Production information created successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async addProduction(@Body() createProductionDto: CreateProductionDto){
 return this.animalsService.addProduction(createProductionDto)
}

@Get('production/all/farm/:adminId')
@ApiOperation({
  summary: 'Get all production information for a farm',
  description: 'Retrieves all production information for a farm',
  responses: {
    200: {
      description: 'Production information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async getAllProductionsInFarm(@Param('adminId') adminId: string){
 return this.animalsService.getAllProductionsInFarm(adminId);
}

@Get('production/all/animal/:animalId')
@ApiOperation({
  summary: 'Get all production information for an animal',
  description: 'Retrieves all production information for an animal',
  responses: {
    200: {
      description: 'Production information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async getAllProductiondPerAnimal(@Param('animalId') animalId: string){
 return this.animalsService.getAllProductionsPerAnimal(animalId);
}

@Get('production/:Id')
@ApiOperation({
  summary: 'Get specific production information',
  description: 'Retrieves specific production information',
  responses: {
    200: {
      description: 'Production information retrieved successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async getSpecificProduction(@Param('Id') Id: string){
 return this.animalsService.getSpecificProduction(Id);
}

@Patch('production/:Id')
@ApiOperation({
  summary: 'Update production information',
  description: 'Updates production information',
  responses: {
    200: {
      description: 'Production information updated successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async updateProduction(@Param('Id') Id: string, @Body() updateVaccinationDto: UpdateVaccinationDto){
 return this.animalsService.updateProduction(Id, updateVaccinationDto);
}

@Delete('production/:Id')
@ApiOperation({
  summary: 'Delete production information',
  description: 'Deletes production information',
  responses: {
    200: {
      description: 'Production information deleted successfully',
    },
    401: {
      description: 'Unauthorized',
    },
  },
})
async deleteProduction(@Param('Id') Id: string){
 return this.animalsService.deleteProduction(Id);
}


}
