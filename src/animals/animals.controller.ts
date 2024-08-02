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
}
