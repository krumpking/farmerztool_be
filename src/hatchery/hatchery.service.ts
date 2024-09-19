import { Inject, Injectable } from '@nestjs/common';
import { EggRecord } from './interfaces/hatchery.interface';
import { HATCHERY_MODEL } from './constants/hatchery.constants';
import { Model } from 'mongoose';
import { CreateHatcheryDto } from './dto/create-hatchery.dto';
import { ResponseDto } from 'src/common/response.dto';
import { UpdateHatcheryDto } from './dto/update-hatchery.dto';
import { FARM_MODEL } from 'src/admin/constants/admin.constants';
import { Farm } from 'src/admin/interfaces/farm.interface';


@Injectable()
export class HatcheryService {
  constructor(
    @Inject(HATCHERY_MODEL)
    private eggModel: Model<EggRecord>,
    @Inject(FARM_MODEL)
    private farmModel: Model<Farm>
  ) { }


  /////////////////////////////////EGGS///////////////////////////////////////////////

  async createEgg(adminId: string, createEggDto: CreateHatcheryDto): Promise<ResponseDto> {
    try {
      //check if egg record exist by checking adminId, animalType, maleBreed, femaleBreed, EggColle, EggQua, EggCol, totalWei, purpo, batchNu
      const eggRecord = await this.eggModel.findOne({
        adminId,
        ...createEggDto
      }).exec();
      if (eggRecord) {
        return ResponseDto.errorResponse("Egg record already exists");
      }

      const eggInstance = await this.eggModel.create({
        ...createEggDto,
        adminId
      })

      const createdEggRecord = await this.eggModel.findById(eggInstance._id);

      if (!createdEggRecord) {
        return ResponseDto.errorResponse("Failed to create egg record");
      }

      //check if the user has a farm

      const farm = await this.farmModel.findOne({ adminId });

      if (farm) {
        const addEggRecordToFarm = await this.farmModel.findOneAndUpdate({ adminId }, {
          $push: { hatchery: createdEggRecord._id }
        });

        if (!addEggRecordToFarm) {
          return ResponseDto.errorResponse("Failed to add egg record to farm")
        }

        return ResponseDto.successResponse("Egg record created and added to farm", createdEggRecord);

      } else {
        return ResponseDto.successResponse("Egg record created", createdEggRecord);
      }

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while creating egg record")
    }
  }

  async getEggs(adminId: string): Promise<ResponseDto> {
    try {
      const eggs = await this.eggModel.find({ adminId }).exec();
      if (!eggs || eggs.length === 0) {
        return ResponseDto.errorResponse("No eggs available")
      }

      return ResponseDto.successResponse("Eggs fetched", eggs);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while getting eggs")
    }
  }

  async getEggById(id: string): Promise<ResponseDto> {
    try {
      const egg = await this.eggModel.findById(id).exec();
      if (!egg) {
        return ResponseDto.errorResponse("Egg not found")
      }

      return ResponseDto.successResponse("Egg found", egg);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while getting egg")
    }
  }

  async updateEgg(id: string, updateEggDto: UpdateHatcheryDto): Promise<ResponseDto> {
    try {

      const updatedEgg = await this.eggModel.findByIdAndUpdate(id, updateEggDto, { new: true }).exec();

      if (!updatedEgg) {
        return ResponseDto.errorResponse("Egg not found")
      }

      return ResponseDto.successResponse("Egg updated", updatedEgg);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while updating egg")
    }

  }

  async deleteEgg(id: string): Promise<ResponseDto> {
    try {

      const deletedEgg = await this.eggModel.findByIdAndDelete(id).exec();

      if (!deletedEgg) {
        return ResponseDto.errorResponse("Egg not found")
      }

      return ResponseDto.successResponse("Egg deleted", null);

    }

    catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while deleting egg")
    }

  }



}
