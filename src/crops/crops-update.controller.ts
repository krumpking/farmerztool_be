import { RolesGuard } from "src/roles/roles.guard";
import { CropsService } from "./crops.service";
import { Body, Controller, Get, Patch, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { UpdateFinancialDto } from "./dto/update-financial.dto";
import { UpdateFertiliserPesticideDTO } from "./dto/update-fert-pest.dto";

@ApiTags('CROPS UPDATES')
@ApiBearerAuth()
@Controller('/api/v1/crops')
@UseGuards(RolesGuard)
export class CropsUpdatesController {
  constructor(private readonly cropsService: CropsService) {}

  private getUserFromRequest(req): any {
    return req.user;
  }

  ////////////////////////////// CROPS //////////////////////////////////////////


  @Get('crop-types/all')
  @Roles(Role.Admin, Role.CropManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Gets all crop types registered by the user",
    description: "The reason for fetching crop types is we want to use them in multiple updates for example we can have many cropTypes and we did irrigation on soya for updating all soya we just use the multiple update on irrigation by making use of the soya cropType. So crop updates will have a query which accepts the crop type and we want to dynamically generate the url using the fetched cropTypes. I think the client side when fetching these cropTypes which is an array. Each element when fetched should have a button e.g Update ${item} when click it will take the user to the update url dynamically"
  })
  async getCropTypesByAdmin(@Request() req){
    const user = this.getUserFromRequest(req);
    return this.cropsService.getAllCropsTypesForAdmin(user?.adminId);
  }

  @Patch('activities/update/all')
  @Roles(Role.Admin, Role.CropManager)
  @Permissions(Permission.Update)
  @ApiOperation({
    summary: "Update activities for all crops of a specific type",
    description: "Updates the activity records for all crops of the specified crop type. NB: cropType from the getCropTypes to used as a query like this ...activies/update/all?cropType={given crop type}"
  })
  async updateActivityForAllCrops(
    @Request() req,
    @Query('cropType') cropType: string,
    @Body() updateActivityDto: UpdateActivityDto
  ) {
    const user = this.getUserFromRequest(req);
    return this.cropsService.updateActivityForAllCrops(user?.adminId, cropType, updateActivityDto);
  }

  @Patch('finances/update/all')
@Roles(Role.Admin, Role.CropManager)
@Permissions(Permission.Update)
@ApiOperation({
  summary: "Update financial records for all crops of a specific type",
  description: "Updates the financial records for all crops of the specified crop type. NB: cropType from the getCropTypes to be used as a query like this ...finances/update/all?cropType={given crop type}"
})
async updateFinancialRecordsForAllCrops(
  @Request() req,
  @Query('cropType') cropType: string,
  @Body() updateFinancialDto: UpdateFinancialDto
) {
  const user = this.getUserFromRequest(req);
  return this.cropsService.updateFinancialRecordsForAllCrops(user?.adminId, cropType, updateFinancialDto);
}

@Patch('fertilizers-pesticides/update/all')
@Roles(Role.Admin, Role.CropManager)
@Permissions(Permission.Update)
@ApiOperation({
  summary: "Update fertilizer and pesticide records for all crops of a specific type",
  description: "Updates the fertilizer and pesticide records for all crops of the specified crop type. NB: cropType from the getCropTypes to be used as a query like this ...fertilizers-pesticides/update/all?cropType={given crop type}"
})
async updateFertilizerPesticideRecordsForAllCrops(
  @Request() req,
  @Query('cropType') cropType: string,
  @Body() updateFertPestDto: UpdateFertiliserPesticideDTO
) {
  const user = this.getUserFromRequest(req);
  return this.cropsService.updateFertilizerPesticideRecordsForAllCrops(user?.adminId, cropType, updateFertPestDto);
}


}