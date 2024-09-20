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
  UseGuards,
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
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/roles.enum';
import { Permissions, Roles } from 'src/roles/roles.decorators';
import { Permission } from 'src/roles/permissions.enum';




@ApiTags("ANIMALS")
@ApiBearerAuth()
@Controller('/api/v1/animals')
@UseGuards(RolesGuard)
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }

  private getUserFromRequest(req): any {
    return req.user;
  }


  /////////////////////// ANIMALS //////////////////////////////////////////////////////
  @Post('add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Create a new animal',
    description: 'Creates a new animal. NB: Animal Id should be unique',
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
    const user = this.getUserFromRequest(req);
    return this.animalsService.addAnimal(user.adminId, createAnimalDto);
  }

  @Get(':Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get an animal by ID',
    description: 'Retrieves an animal by ID mongoose id',
    responses: {
      200: {
        description: 'Animal retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAnimal(@Param('Id') Id: string) {
    return this.animalsService.getAnimal(Id);
  }

  @Get('all/:adminId')
  @Roles(Role.Admin, Role.FarmManager, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all animals for a specific admin',
    description: 'Retrieves all animals for a specific admin. NB: Every user has got an adminId property accessed like this user?.adminId',
    responses: {
      200: {
        description: 'Animals retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllAnimals(@Param('adminId') adminId: string, @Request() req) {
    const user = this.getUserFromRequest(req);
    if (user?.adminId === adminId) {
      return this.animalsService.getAllMyAnimals(adminId);
    } else {
      throw new HttpException("Unauthorised", 401);
    }
  }

  @Patch(':Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update an animal',
    description: 'Updates an animal by id mongoose id',
    responses: {
      200: {
        description: 'Animal updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateAnimal(@Param('Id') Id: string, @Request() req, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.updateAnimal(Id, updateAnimalDto);
  }

  @Delete(':Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete an animal',
    description: 'Deletes an animal by mongoose id',
    responses: {
      200: {
        description: 'Animal deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteAnimal(@Param('Id') Id: string) {
    return this.animalsService.deleteAnimal(Id);
  }

  ////////////////////////// BREEDING //////////////////////////////////////////////

  @Post('breeding/add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
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
    const user = this.getUserFromRequest(req);
    return this.animalsService.addBreedingInfo(user.adminId, createBreedingDto);
  }

  @Get('breeding/:animalId')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get breeding information for an animal',
    description: 'Retrieves breeding information for an animal using the animalId not mongoose_id or adminId. ANIMALID PLEASE',
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
    const user = this.getUserFromRequest(req);
    return this.animalsService.getAnimalBreedingInfo(user?.adminId, animalId);
  }

  @Get('breeding/all/:adminId')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all breeding information for an admin using adminID',
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
    const user = this.getUserFromRequest(req);
    if (user?.adminId === adminId) {
      return this.animalsService.getAllBreedingInfo(adminId);
    }
  }

  @Patch('breeding/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update breeding information for an animal',
    description: 'Updates breeding information for an animal using mongoose_id',
    responses: {
      200: {
        description: 'Breeding information updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateBreeding(@Param('id') animalId: string, @Request() req, @Body() updateBreedingDto: UpdateBreedingDto) {
    return this.animalsService.updateBreedingInfo(animalId,updateBreedingDto);
  }

  @Delete('breeding/:animalId')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Delete)
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
  async deleteBreeding(@Param('animalId') animalId: string) {
    return this.animalsService.deleteBreedingInfo(animalId);
  }

  ////////////////// FEEDING /////////////////////////////////////////////////////////

  @Post('feeding/add/info')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
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
    const user = this.getUserFromRequest(req);
    return this.animalsService.addFeed(user.adminId, createFeedingDto);
  }

  @Get('feeding/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
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
  async getFeedingInfo(@Param('id') id: string) {
    return this.animalsService.getFeedingInfo(id);
  }

  @Get('feeding/animal/:animalId')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get feeding information for an animal',
    description: 'Retrieves feeding information for an animal',
    responses: {
      200: {
        description: 'Feeding information retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getFeedingInfoByAnimalId(@Param('animalId') animalId: string, @Request() req) {
    const user = this.getUserFromRequest(req)
    return this.animalsService.getAnimalFeedingInfo(animalId, user?.adminId);
  }

  @Get('feeding/all/:adminId')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
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
    const user = this.getUserFromRequest(req);
    if (user?.adminId === adminId) {
      return this.animalsService.getAllAnimalFeedingInfo(adminId);
    }
  }

  @Patch('feeding/:Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update feeding information for a feed',
    description: 'Updates feeding information for a feed using mongoose id',
    responses: {
      200: {
        description: 'Feeding information updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateFeeding(@Param('Id') Id: string, @Body() updateFeedingDto: UpdateFeedDto) {
    return this.animalsService.updateFeed(Id, updateFeedingDto);
  }

  @Delete('feeding/:Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Delete)
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
  async deleteFeeding(@Param('Id') Id: string) {
    return this.animalsService.deleteFeed(Id);
  }


  /////////////////////////VACCINATION/////////////////////////////////////////////

  @Post('vaccination/add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
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
  async addVaccination(@Body() createVaccinationDto: CreateVaccinationDto, @Request() req) {
    const user = this.getUserFromRequest(req)
    return this.animalsService.addVaccination(user?.adminId, createVaccinationDto)
  }

  @Get('vaccination/all/farm/:adminId')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
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
  async getAllVaccinesInFarm(@Param('adminId') adminId: string, @Request() req) {
    const user = this.getUserFromRequest(req)
    if (user?.adminId === adminId) {
      return this.animalsService.getAllVaccinesInFarm(adminId);
    }
  }

  @Get('vaccination/all/animal/:animalId')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
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
  async getAllVaccinesPerAnimal(@Param('animalId') animalId: string, @Request() req) {
    const user = this.getUserFromRequest(req)
    return this.animalsService.getAllVaccinesPerAnimal(animalId, user?.adminId);
  }

  @Get('vaccination/:Id')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get specific vaccination information',
    description: 'Retrieves specific vaccination information by its id',
    responses: {
      200: {
        description: 'Vaccination information retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getSpecificVaccine(@Param('Id') Id: string) {
    return this.animalsService.getSpecificVaccine(Id);
  }

  @Patch('vaccination/:Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
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
  async updateVaccine(@Param('Id') Id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.animalsService.updateVaccine(Id, updateVaccinationDto);
  }

  @Delete('vaccination/:Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Delete)
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
  async deleteVaccine(@Param('Id') Id: string) {
    return this.animalsService.deleteVaccine(Id);
  }

  /////////////////////////PRODUCTION//////////////////////////////////////

  @Post('production/add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
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
  async addProduction(@Body() createProductionDto: CreateProductionDto, @Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.addProduction(user?.adminId, createProductionDto)
  }

  @Get('production/all/farm/:adminId')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
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
  async getAllProductionsInFarm(@Param('adminId') adminId: string, @Request() req) {
    const user = this.getUserFromRequest(req)
    if (user?.adminId === adminId) {
      return this.animalsService.getAllProductionsInFarm(adminId);
    }

  }

  @Get('production/all/animal/:animalId')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
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
  async getAllProductiondPerAnimal(@Param('animalId') animalId: string, @Request() req) {
    const user = this.getUserFromRequest(req)
    return this.animalsService.getAllProductionsPerAnimal(animalId, user?.adminId);
  }

  @Get('production/:Id')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
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
  async getSpecificProduction(@Param('Id') Id: string) {
    return this.animalsService.getSpecificProduction(Id);
  }

  @Patch('production/:Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
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
  async updateProduction(@Param('Id') Id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.animalsService.updateProduction(Id, updateVaccinationDto);
  }

  @Delete('production/:Id')
  @Roles(Role.Admin, Role.AnimalManager)
@Permissions(Permission.Delete)
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
  async deleteProduction(@Param('Id') Id: string) {
    return this.animalsService.deleteProduction(Id);
  }


}
