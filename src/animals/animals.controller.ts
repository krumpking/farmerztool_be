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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { UpdateBreedingDto } from './dto/updateBreeding.dto';
import { UpdateFeedDto } from './dto/updateFeed.dto';
import { UpdateVaccinationDto } from './dto/updateVaccination.dto';



@ApiTags("ANIMALS")
@ApiBearerAuth()
@Controller('/api/v1/animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  /////////////////////// ANIMALS //////////////////////////////////////////////////////

  @Post('add')
  async create(@Body() createAnimalDto: CreateAnimalDto, @Request() req) {

    const check = req.user.roles === "Admin";
    if (check) {
      return this.animalsService.addAnimal(createAnimalDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Get(':animalId')
  async getAnimal(@Param('animalId') animalId: string, @Request() req) {
    if(req.user.roles === "Admin"){
      return this.animalsService.getAnimal(animalId);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Get('all/:adminId')
  async getAllAnimals(@Param('adminId') adminId: string , @Request() req) {
    if(req.user.roles === "Admin"){
      return this.animalsService.getAllMyAnimals(adminId);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Patch(':animalId')
  async updateAnimal(@Param('animalId') animalId: string, @Request() req, @Body() updateAnimalDto: UpdateAnimalDto){
    if(req.user.roles === "Admin"){
      return this.animalsService.updateAnimal(animalId, updateAnimalDto);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Delete(':animalId')
  async deleteAnimal(@Param('animalId') animalId: string, @Request() req){
    if(req.user.roles === "Admin"){
      return this.animalsService.deleteAnimal(animalId);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  ////////////////////////// BREEDING //////////////////////////////////////////////

@Post('breeding/add')
async createBreeding(@Body() createBreedingDto: CreateBreedingDto, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.addBreedingInfo(createBreedingDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get('breeding/:animalId')
async getBreedingInfo(@Param('animalId') animalId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.getAnimalBreedingInfo(animalId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get('breeding/all/:adminId')
async getAllBreedingInfo(@Param('adminId') adminId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.getAllBreedingInfo(adminId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Patch('breeding/:animalId')
async updateBreeding(@Param('animalId') animalId: string, @Request() req, @Body() updateBreedingDto: UpdateBreedingDto) {
  if (req.user.roles === "Admin") {
    return this.animalsService.updateBreedingInfo(updateBreedingDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Delete('breeding/:animalId')
async deleteBreeding(@Param('animalId') animalId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.deleteBreedingInfo(animalId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

 ////////////////// FEEDING /////////////////////////////////////////////////////////

 @Post('feeding/add/info')
 async createFeeding(@Body() createFeedingDto: CreateFeedDto, @Request() req) {
   if (req.user.roles === "Admin") {
     return this.animalsService.addFeed(createFeedingDto);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }

 @Get('feeding/:feedId')
 async getFeedingInfo(@Param('feedId') feedId: string, @Request() req) {
   if (req.user.roles === "Admin") {
     return this.animalsService.getFeedingInfo(feedId);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }

 @Get('feeding/all/:adminId')
 async getAllFeedingInfo(@Param('adminId') adminId: string, @Request() req) {
   if (req.user.roles === "Admin") {
     return this.animalsService.getAllAnimalFeedingInfo(adminId);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }

 @Patch('feeding/:feedId')
 async updateFeeding(@Param('feedId') feedId: string, @Request() req, @Body() updateFeedingDto: UpdateFeedDto) {
   if (req.user.roles === "Admin") {
     return this.animalsService.updateFeed(feedId, updateFeedingDto);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }

 @Delete('feeding/:feedId')
 async deleteFeeding(@Param('feedId') feedId: string, @Request() req) {
   if (req.user.roles === "Admin") {
     return this.animalsService.deleteFeed(feedId);
   } else {
     throw new HttpException("Unauthorised", 401);
   }
 }


 /////////////////////////VACCINATION/////////////////////////////////////////////

 @Post('vaccination/add')
 async addVaccination(@Body() createVaccinationDto: CreateVaccinationDto){
  return this.animalsService.addVaccination(createVaccinationDto)
 }

 @Get('vaccination/all/farm/:adminId')
 async getAllVaccinesInFarm(@Param('adminId') adminId: string){
  return this.animalsService.getAllVaccinesInFarm(adminId);
 }

 @Get('vaccination/all/animal/:animalId')
 async getAllVaccinesPerAnimal(@Param('animalId') animalId: string){
  return this.animalsService.getAllVaccinesPerAnimal(animalId);
 }

 @Get('vaccination/:animalId')
 async getSpecificVaccine(@Param('animalId') animalId: string){
  return this.animalsService.getSpecificVaccine(animalId);
 }

 @Patch('vaccination/:animalId')
 async updateVaccine(@Param('animalId') animalId: string, @Body() updateVaccinationDto: UpdateVaccinationDto){
  return this.animalsService.updateVaccine(animalId, updateVaccinationDto);
 }

 @Delete('vaccination/:animalId')
 async deleteVaccine(@Param('animalId') animalId: string){
  return this.animalsService.deleteAnimal(animalId);
 }

/////////////////////////PRODUCTION//////////////////////////////////////

}
