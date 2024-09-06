import { Injectable, Inject } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CROP_MODEL } from './constants/crop.constants';
import { Model } from 'mongoose';
import { Crop } from './interfaces/crop.interface';
import { ResponseDto } from 'src/common/response.dto';
import { USER_MODEL } from 'src/auth/constants/auth.constants';
import { User } from 'src/auth/interfaces/user.interface';

@Injectable()
export class CropsService {
  constructor(
    @Inject(CROP_MODEL) private cropModel: Model<Crop>,
    @Inject(USER_MODEL) private userModel: Model<User>,
  ) {}

  /////////////////////////// CROPS /////////////////////////////

  async addCrop(createCropDto: CreateCropDto): Promise<ResponseDto>{
    try {
      // check if the crop is not already there using cropname
      const existingCrop = await this.cropModel.findOne({cropName: createCropDto.cropName});
      if(existingCrop){
        return ResponseDto.errorResponse("Crop with that name already exists, please try again");
      }

      const crop = await this.cropModel.create(createCropDto);

      const createdCrop = await this.cropModel.findById(crop._id);

      if(!createdCrop){
        return ResponseDto.errorResponse("Failed to create crop record");
      }


      return ResponseDto.successResponse("Crop record created", createdCrop);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong adding crop")
    }
  }


  async getCrops(): Promise<ResponseDto>{
    try {
      const crops = await this.cropModel.find();
      if(!crops || crops.length === 0){
        return ResponseDto.errorResponse("No available crops at the moment");
      }

      return ResponseDto.successResponse(`${crops.length} Crops fetched`, crops);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, fetching crops")
    }
  }


  async getCrop(id: string): Promise<ResponseDto>{
    try {
      const crop = await this.cropModel.findById(id);
      if(!crop){
        return ResponseDto.errorResponse("Failed to fetch crop");
      }
      return ResponseDto.successResponse(`${crop?.cropName} fetched`, crop);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, fetching crop")
    }
  }

  async updateCrop(id: string, updateCropDto: UpdateCropDto): Promise<ResponseDto>{
    try {
      const updatedCrop = await this.cropModel.findByIdAndUpdate(id, updateCropDto, {new: true}).exec();
      if(!updateCropDto){
        return ResponseDto.errorResponse("Crop not found");
      }

      return ResponseDto.successResponse("Crop updated", updatedCrop);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, updating crop record")
    }
  }

  async deleteCrop(id: string): Promise<ResponseDto>{
    try {
      const deletedCrop = await this.cropModel.findByIdAndDelete(id);
      if(!deletedCrop){
        return ResponseDto.errorResponse("Failed to delete crop");
      }

      return ResponseDto.successResponse(`${deletedCrop?.cropName} deleted`, null);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while deleting crop")
    }
  }

}
