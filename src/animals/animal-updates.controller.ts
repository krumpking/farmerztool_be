import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AnimalsService } from "./animals.service";
import { Body, Controller, Get, Patch, Query, Request, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/roles/roles.guard";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { UpdateFeedDto } from "./dto/updateFeed.dto";
import { UpdateVaccinationDto } from "./dto/updateVaccination.dto";

@ApiTags("ANIMAL MULTIPLE UPDATES")
@ApiBearerAuth()
@Controller('/api/v1/animals')
@UseGuards(RolesGuard)
export class AnimalsUpdatesController {
  constructor(private readonly animalsService: AnimalsService) { }

  private getUserFromRequest(req): any {
    return req.user;
  }

  @Get('animal-types/all')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Gets all animal types registered by the user",
    description: "The reason for fetching animal types is we want to use them in multiple updates for example we can have many animalTypes and we did vaccination on cows for updating all cows we just use the multiple update on vaccination by making use of the Cow animalType. So animal updates will have a query which accepts the animal type and we want to dynamically generate the url using the fetched animalTypes. I think the client side when fetching these animalTypes which is an array. Each element when fetched should have a button e.g Update ${item} when click it will take the user to the update url dynamically"
  })
  async getAnimalTypesByAdmin(@Request() req){
    const user = this.getUserFromRequest(req);
    return this.animalsService.getAllAnimalsTypesForAdmin(user?.adminId);
  }


  @Patch('feed/update/all')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: "Update feed for all animals of a specific type",
    description: "Updates the feed records for all animals of the specified animal type. NB: animalType from the getAnimalTypes to used as a query like this ...feed/update/all?animalType={given animal type}"
  })
  async updateFeedForAllAnimals(
    @Request() req,
    @Query('animalType') animalType: string,
    @Body() updateFeedDto: UpdateFeedDto
  ) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.updateFeedForAllAnimals(user?.adminId, animalType, updateFeedDto);
  }

  @Patch('vaccination/update/all')
  @Roles(Role.Admin, Role.AnimalManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: "Update vaccination for all animals of a specific type",
    description: "Updates the vaccination records for all animals of the specified animal type. NB: animalType from the getAnimalTypes to used as a query like this ...vaccination/update/all?animalType={given animal type}"
  })
  async updateVaccinationForAllAnimals(
    @Request() req,
    @Query('animalType') animalType: string,
    @Body() updateVaccinationDto: UpdateVaccinationDto
  ) {
    const user = this.getUserFromRequest(req);
    return this.animalsService.updateVaccinationForAllAnimals(user?.adminId, animalType, updateVaccinationDto);
  }


  
}