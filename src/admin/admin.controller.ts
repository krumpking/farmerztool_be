import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateFarmDto } from './dto/create-admin.dto';
import { ResponseDto } from 'src/common/response.dto';

@Controller('/api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('farm')
  async addFarm(
    @Body('farm') createFarmDto: CreateFarmDto,
  ): Promise<ResponseDto> {
    const farm = await this.adminService.addFarm(createFarmDto);

    if (farm == null) {
      return {
        data: null,
        message: 'Error adding farm',
        success: false,
      };
    } else {
      return {
        data: farm,
        message: 'Farm was registered successfully',
        success: true,
      };
    }
  }

  @Patch('update/farm')
  async updateFarm(
    @Body('farm') createFarmDto: CreateFarmDto,
  ): Promise<ResponseDto> {
    const farm = await this.adminService.updateFarm(createFarmDto);

    if (farm == null) {
      return {
        data: null,
        message: 'Error adding farm',
        success: false,
      };
    } else {
      return {
        data: farm,
        message: 'Farm was registered successfully',
        success: true,
      };
    }
  }
}
