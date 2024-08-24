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
import { ApiTags } from '@nestjs/swagger';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { UpdateBreedingDto } from './dto/updateBreeding.dto';



@ApiTags("ANIMALS")
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

@Post('add')
async createBreeding(@Body() createBreedingDto: CreateBreedingDto, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.addBreedingInfo(createBreedingDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get(':animalId')
async getBreedingInfo(@Param('animalId') animalId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.getAnimalBreedingInfo(animalId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Get('all/:adminId')
async getAllBreedingInfo(@Param('adminId') adminId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.getAllBreedingInfo(adminId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Patch(':animalId')
async updateBreeding(@Param('animalId') animalId: string, @Request() req, @Body() updateBreedingDto: UpdateBreedingDto) {
  if (req.user.roles === "Admin") {
    return this.animalsService.updateBreedingInfo(updateBreedingDto);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

@Delete(':animalId')
async deleteBreeding(@Param('animalId') animalId: string, @Request() req) {
  if (req.user.roles === "Admin") {
    return this.animalsService.deleteBreedingInfo(animalId);
  } else {
    throw new HttpException("Unauthorised", 401);
  }
}

 ////////////////// FEEDING /////////////////////////////////////////////////////////

  @Post('add/feeding/info')
  async addFeed(@Body('feed') feedInfo: CreateFeedDto) {
    const _addFeed = await this.animalsService.addFeed(feedInfo);

    if (_addFeed == null) {
      return {
        data: null,
        message: 'There was an error adding feed info',
        success: false,
      };
    } else {
      return {
        data: _addFeed,
        message: 'Feed added successfully',
        success: true,
      };
    }
  }

  @Get('feeding/:animal')
  async getAnimalFeedingInfo(@Param('animal') animal: string) {
    const _getAnimal = await this.animalsService.getAnimalFeedingInfo(animal);

    if (_getAnimal == null) {
      return {
        data: null,
        message: 'There was an error getting animal feeding info',
        success: false,
      };
    } else {
      return {
        data: _getAnimal,
        message: 'Got animal feed info successfully',
        success: true,
      };
    }
  }

   @Post('add/vaccination/info')
  async addVaccination(@Body('vaccination') vaccination: CreateVaccinationDto) {
    const _addVac = await this.animalsService.addVaccination(vaccination);

    if (_addVac == null) {
      return {
        data: null,
        message: 'There was an error adding vaccination info',
        success: false,
      };
    } else {
      return {
        data: _addVac,
        message: 'Vaccination added successfully',
        success: true,
      };
    }
  }
}
