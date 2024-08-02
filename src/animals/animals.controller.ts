import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { CreateBreedingDto } from './dto/breeding.dto';
import { CreateFeedDto } from './dto/feed.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post('add')
  async create(@Body('animal') createAnimalDto: CreateAnimalDto) {
    const _addAnimal = await this.animalsService.addAnimal(createAnimalDto);

    if (_addAnimal == null) {
      return {
        data: null,
        message: 'There was an error adding animal',
        success: false,
      };
    } else {
      return {
        data: _addAnimal,
        message: 'Animal added successfully',
        success: true,
      };
    }
  }

  @Get(':animal')
  async getAnimal(@Param('animal') animal: String) {
    const _addAnimal = await this.animalsService.getAnimal(animal);

    if (_addAnimal == null) {
      return {
        data: null,
        message: 'There was an error getting animal',
        success: false,
      };
    } else {
      return {
        data: _addAnimal,
        message: 'Got animal successfully',
        success: true,
      };
    }
  }

  @Get('all/:adminId')
  async getAllAnimals(@Param('adminId') adminId: String) {
    const allAnimals = await this.animalsService.getAllMyAnimals(adminId);

    if (allAnimals == null) {
      return {
        data: null,
        message: 'There was an error getting animals',
        success: false,
      };
    } else {
      return {
        data: allAnimals,
        message: 'Got animal successfully',
        success: true,
      };
    }
  }

  @Post('add/breeding/info')
  async addBreed(@Body('breed') breedingInfo: CreateBreedingDto) {
    const _addBreedingInfo =
      await this.animalsService.addBreedingInfo(breedingInfo);

    if (_addBreedingInfo == null) {
      return {
        data: null,
        message: 'There was an error adding breeding info',
        success: false,
      };
    } else {
      return {
        data: _addBreedingInfo,
        message: 'Breeding ingo added successfully',
        success: true,
      };
    }
  }

  @Get('breeding/:animal')
  async getAnimalBreedingInfo(@Param('animal') animal: String) {
    const _getAnimal = await this.animalsService.getAnimalBreedingInfo(animal);

    if (_getAnimal == null) {
      return {
        data: null,
        message: 'There was an error getting animal breeding info',
        success: false,
      };
    } else {
      return {
        data: _getAnimal,
        message: 'Got animal breeding info successfully',
        success: true,
      };
    }
  }

  // Get one breeding info
  @Get('breeding/:adminId')
  async getAllBreedingInfo(@Param('adminId') adminId: String) {
    const allAnimals = await this.animalsService.getAllBreedingInfo(adminId);

    if (allAnimals == null) {
      return {
        data: null,
        message: 'There was an error getting all breeding info',
        success: false,
      };
    } else {
      return {
        data: allAnimals,
        message: 'Got animal breeding info successfully',
        success: true,
      };
    }
  }

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
  async getAnimalFeedingInfo(@Param('animal') animal: String) {
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
