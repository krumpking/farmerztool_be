import { Inject, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-admin.dto';
import { Farm } from './entities/admin.entity';
import { Model } from 'mongoose';
import { FARM_MODEL } from './constants/admin.constants';

@Injectable()
export class AdminService {
  constructor(
    @Inject(FARM_MODEL)
    private farmModel: Model<Farm>,
  ) {}

  async addFarm(farm: CreateFarmDto): Promise<any> {
    try {
      // Check if farm name is already taken before adding farm
      const farmExists = await this.farmModel.find({ adminId: farm.adminId });

      if (farmExists.length > 0) {
        // if farm exists upadate the farm
        return this.farmModel.findOneAndUpdate(
          { adminId: farm.adminId },
          farm,
          { new: true },
        );
      } else {
        const createdFarm = new this.farmModel(farm);
        return createdFarm.save();
      }
    } catch (error) {
      return null;
    }
  }

  async updateFarm(farm: CreateFarmDto): Promise<any> {
    try {
      // if farm exists upadate the farm
      return this.farmModel.findOneAndUpdate({ adminId: farm.adminId }, farm, {
        new: true,
      });
    } catch (error) {
      return null;
    }
  }
}
