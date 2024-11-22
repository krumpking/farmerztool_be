import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  Patch,
  UseGuards,
  Query,
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
import { CreateAnimalRequestDto } from './dto/animalByEmployeeRequest.dto';
import { UpdateAnimalRequestDto } from './dto/update-animal-request.dto';
import { LocationDTO } from './dto/animal-location.dto';




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

  @Get(':id')
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
  async getAnimal(@Param('id') Id: string) {
    return this.animalsService.getAnimal(Id);
  }

  @Get('all/farm/animals')
  @Roles(Role.Admin, Role.FarmManager, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all animals for a specific admin',
    description: 'Retrieves all animals for a specific admin. NB: Every user has got an adminId property accessed like this user?.adminId. NB: I added the page query, query name should be page and the example url is like this api/v1/animals/all/farm/animals?page=1. Our page starts at zero and the limit is 10 records per page, so in the FE you can implement a way for the user to go to the next page while increasing the page number and vise versa',
    responses: {
      200: {
        description: 'Animals retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllAnimals(@Request() req, @Query('page') page: number) {
    const user = this.getUserFromRequest(req);
    const pageNumber = page || 0;
    return this.animalsService.getAllMyAnimals(user?.adminId, pageNumber);
  }

  @Patch(':id')
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
  async updateAnimal(@Param('id') Id: string, @Request() req, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.updateAnimal(Id, updateAnimalDto);
  }

  @Delete(':id')
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
  async deleteAnimal(@Param('id') Id: string) {
    return this.animalsService.deleteAnimal(Id);
  }


  ///////////////////////ANIMAL LOCATIONS//////////////////

  @Patch(':id/location/add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Add location to an animal',
    description: 'Adds location to an animal by id mongoose id',
    responses: {
      200: {
        description: 'Location added successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async addLocation(@Param('id') id: string, @Body() location: LocationDTO) {
    return this.animalsService.addLocation(id, location);
  }

  @Get(':id/locations')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all locations for an animal',
    description: 'Retrieves all locations for an animal by id mongoose id',
    responses: {
      200: {
        description: 'Location retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getLocations(@Param('id') id: string) {
    return this.animalsService.getAllLocations(id);
  }

  @Get(':id/location/:locationId')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get specific single location for an animal',
    description: 'Retrieves location for an animal by id mongoose id ,  locationId is also a mongoose id from location data which is this example object {date: 2022-01-01T00:00:00.000Z, lat: 37.7749, lng: -122.4194,_id: "670f163bdd489764dff3a7a2}, so location id is the _id from the location data object',
    responses: {
      200: {
        description: 'Location retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getLocation(@Param('id') id: string, @Param('locationId') locationId: string) {
    return this.animalsService.getSpecificLocation(id, locationId);
  }

  @Delete(':id/location/:locationId/delete')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Delete location from an animal',
    description: 'Deletes location from an animal by id mongoose id, locationId is also a mongoose id from location data which is this example object {date: 2022-01-01T00:00:00.000Z, lat: 37.7749, lng: -122.4194,_id: "670f163bdd489764dff3a7a2} so location id is the _id from the location data object',
    responses: {
      200: {
        description: 'Location deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteLocation(@Param('id') id: string, @Param('locationId') locationId: string) {
    return this.animalsService.deleteLocation(id, locationId);
  }

  ////////////////////////// BREEDING //////////////////////////////////////////////

  @Post(':id/breeding/add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Create new breeding information',
    description: 'Creates new breeding information. NB: id is animal mongoose id which need a breeding record',
    responses: {
      201: {
        description: 'Breeding information created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async createBreeding(@Body() createBreedingDto: CreateBreedingDto, @Param('id') id: string) {
    return this.animalsService.addBreedingInfo(id, createBreedingDto);
  }

  @Get(':id/breeding')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get breeding information for an animal',
    description: 'Retrieves breeding information for an animal using its mongoose_id ',
    responses: {
      200: {
        description: 'Breeding information retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getBreedingInfo(@Param('id') Id: string) {
    return this.animalsService.getAnimalBreedingInfo(Id);
  }

  @Get('breeding/all/farm')
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
  async getAllBreedingInfo(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.getAllBreedingInfo(user?.adminId);
  }

  @Patch('breeding/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update breeding information for an animal',
    description: 'Updates breeding information for an animal using breeding mongoose_id',
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
    return this.animalsService.updateBreedingInfo(animalId, updateBreedingDto);
  }

  @Delete('breeding/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete breeding information for an animal',
    description: 'Deletes breeding information for an animal using the breeding mongoose _id',
    responses: {
      200: {
        description: 'Breeding information deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteBreeding(@Param('id') animalId: string) {
    return this.animalsService.deleteBreedingInfo(animalId);
  }

  ////////////////// FEEDING /////////////////////////////////////////////////////////

  @Post(':id/feeding/add/info')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Create new feeding information',
    description: 'Creates new feeding information. NB: id is the mongoose id for the animal that need a feed record',
    responses: {
      201: {
        description: 'Feeding information created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async createFeeding(@Body() createFeedingDto: CreateFeedDto, @Param('id') id: string) {
    return this.animalsService.addFeed(id, createFeedingDto);
  }

  @Get('feeding/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get feeding information for a feed',
    description: 'Retrieves feeding information for a feed using its mongoose id',
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

  @Get('feeding/animal/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get feeding information for an animal',
    description: 'Retrieves feeding information for an animal using animal its mongoose _id',
    responses: {
      200: {
        description: 'Feeding information retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getFeedingInfoByAnimalId(@Param('id') id: string) {
    return this.animalsService.getAnimalFeedingInfo(id);
  }

  @Get('feeding/all/farm')
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
  async getAllFeedingInfo(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.getAllAnimalFeedingInfo(user?.adminId);
  }

  @Patch('feeding/:id')
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
  async updateFeeding(@Param('id') Id: string, @Body() updateFeedingDto: UpdateFeedDto) {
    return this.animalsService.updateFeed(Id, updateFeedingDto);
  }

  @Delete('feeding/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete feeding information for a feed',
    description: 'Deletes feeding information for a feed using its feed mongoose id',
    responses: {
      200: {
        description: 'Feeding information deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteFeeding(@Param('id') Id: string) {
    return this.animalsService.deleteFeed(Id);
  }


  /////////////////////////VACCINATION/////////////////////////////////////////////

  @Post(':id/vaccination/add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Create new vaccination information',
    description: 'Creates new vaccination information using animal mongoose _id',
    responses: {
      201: {
        description: 'Vaccination information created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async addVaccination(@Body() createVaccinationDto: CreateVaccinationDto, @Param('id') id: string) {
    return this.animalsService.addVaccination(id, createVaccinationDto)
  }

  @Get('vaccination/all/farm/')
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
  async getAllVaccinesInFarm(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.getAllVaccinesInFarm(user?.adminId);
  }

  @Get('vaccination/all/animal/:id')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all vaccination information for an animal',
    description: 'Retrieves all vaccination information for an animal by its mongoose _id',
    responses: {
      200: {
        description: 'Vaccination information retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllVaccinesPerAnimal(@Param('id') id: string) {
    return this.animalsService.getAllVaccinesPerAnimal(id);
  }

  @Get('vaccination/:id')
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
  async getSpecificVaccine(@Param('id') Id: string) {
    return this.animalsService.getSpecificVaccine(Id);
  }

  @Patch('vaccination/:id')
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
  async updateVaccine(@Param('id') Id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.animalsService.updateVaccine(Id, updateVaccinationDto);
  }

  @Delete('vaccination/:id')
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
  async deleteVaccine(@Param('id') Id: string) {
    return this.animalsService.deleteVaccine(Id);
  }

  /////////////////////////PRODUCTION//////////////////////////////////////

  @Post(':id/production/add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Create new production information',
    description: 'Creates new production information and id is the animal mongoose id',
    responses: {
      201: {
        description: 'Production information created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async addProduction(@Body() createProductionDto: CreateProductionDto, @Param('id') id: string) {
    return this.animalsService.addProduction(id, createProductionDto)
  }

  @Get('production/all/farm')
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
  async getAllProductionsInFarm(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.getAllProductionsInFarm(user?.adminId);
  }

  @Get('production/all/animal/:id')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all production information for an animal',
    description: 'Retrieves all production information for an animal by animal mongoose_id',
    responses: {
      200: {
        description: 'Production information retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllProductiondPerAnimal(@Param('id') id: string) {
    return this.animalsService.getAllProductionsPerAnimal(id);
  }

  @Get('production/:id')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get specific production information',
    description: 'Retrieves specific production information using its mongoose id',
    responses: {
      200: {
        description: 'Production information retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getSpecificProduction(@Param('id') Id: string) {
    return this.animalsService.getSpecificProduction(Id);
  }

  @Patch('production/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update production information',
    description: 'Updates production information its mongoose id for the production to be updated',
    responses: {
      200: {
        description: 'Production information updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateProduction(@Param('id') Id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.animalsService.updateProduction(Id, updateVaccinationDto);
  }

  @Delete('production/:Id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete production information',
    description: 'Deletes production information  its mongoose id for the production to be deleted',
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


  ////////////////////////////ANIMAL REQUEST //////////////////////////////

  @Post('request/add')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Create new animal request',
    description: 'Creates new animal request',
    responses: {
      201: {
        description: 'Animal request created successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async addAnimalRequest(@Body() createAnimalRequestDto: CreateAnimalRequestDto, @Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.addAnimalRequest(user?.adminId, createAnimalRequestDto)
  }

  @Get('request/all/farm')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all animal requests for a farm',
    description: 'Retrieves all animal requests for a farm',
    responses: {
      200: {
        description: 'Animal requests retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllAnimalRequestsInFarm(@Request() req) {
    const user = this.getUserFromRequest(req)
    return this.animalsService.getAllAnimalRequests(user?.adminId);
  }

  @Get('request/:id')
  @Roles(Role.Admin, Role.AnimalManager, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get specific animal request',
    description: 'Retrieves specific animal request using  its mongoose id',
    responses: {
      200: {
        description: 'Animal request retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getSpecificAnimalRequest(@Param('id') Id: string) {
    return this.animalsService.getSpecificAnimalRequest(Id);
  }

  @Patch('request/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Update animal request',
    description: 'Updates animal request using the animal request mongoose id',
    responses: {
      200: {
        description: 'Animal request updated successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateAnimalRequest(@Param('id') Id: string, @Body() updateAnimalRequestDto: UpdateAnimalRequestDto) {
    return this.animalsService.updateAnimalRequest(Id, updateAnimalRequestDto);
  }

  @Delete('request/:id')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Delete)
  @ApiOperation({
    summary: 'Delete animal request',
    description: 'Deletes animal request using  its mongoose id',
    responses: {
      200: {
        description: 'Animal request deleted successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async deleteAnimalRequest(@Param('id') Id: string) {
    return this.animalsService.deleteAnimalRequest(Id);
  }

  @Patch('request/:id/reject')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Reject animal request',
    description: 'Rejects animal request using its mongoose id',
    responses: {
      200: {
        description: 'Animal request rejected successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async rejectAnimalRequest(@Param('id') id: string) {
    return this.animalsService.rejectAnimalRequest(id);
  }

  @Patch('request/:id/approve')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: 'Approve animal request',
    description: 'Approves animal request where id is the animal request mongoose_id',
    responses: {
      200: {
        description: 'Animal request approved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async approveAnimalRequest(@Param('id') id: string) {
    return this.animalsService.approveAnimalRequest(id);
  }

  @Get('request/rejected/animals')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all rejected animal requests',
    description: 'Retrieves all rejected animal requests',
    responses: {
      200: {
        description: 'Rejected animal requests retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllRejectedRequests(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.getRejectedAnimalRequest(user?.adminId);
  }

  @Get('request/approved/animals')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all approved animal requests',
    description: 'Retrieves all approved animal requests',
    responses: {
      200: {
        description: 'Approved animal requests retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllApprovedRequests(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.getApprovedAnimalRequest(user?.adminId);
  }

  @Get('request/pending/animals')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: 'Get all pending animal requests',
    description: 'Retrieves all pending animal requests',
    responses: {
      200: {
        description: 'Pending animal requests retrieved successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getAllPendingRequests(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.getPendingAnimalRequest(user?.adminId);
  }

  @Post('request/:id/add-animal-farm')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: 'Add animal to farm',
    description: 'Adds animal to farm from the approved request using the request mongoose_id',
    responses: {
      201: {
        description: 'Animal added to farm successfully',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async addAnimalToFarm(@Param('id') id: string) {
    return this.animalsService.addApprovedAnimalToFarmAnimals(id);
  }


}
