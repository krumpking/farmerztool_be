import { Injectable, Inject } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import {
  ACTIVITY_MODEL,
  CROP_MODEL,
  FERTILIZER_PESTICIDE_MODEL,
  FINANCIAL_MODE,
  IRRIGATION_MODEL,
  PEST_DISEASE_MODEL,
} from './constants/crop.constants';
import { Model } from 'mongoose';
import { Crop } from './interfaces/crop.interface';
import { ResponseDto, ResponseHandler } from 'src/common/response.dto';
import { USER_MODEL } from 'src/auth/constants/auth.constants';
import { User } from 'src/auth/interfaces/user.interface';
import { Irrigation } from './interfaces/irrigation.interface';
import { CreateIrrigationDto } from './dto/create-irrigation.dto';
import { UpdateIrrigationDto } from './dto/update-irrigation.dto';
import { FARM_MODEL } from 'src/admin/constants/admin.constants';
import { Farm } from 'src/admin/interfaces/farm.interface';
import { FertiliserPesticide } from './interfaces/fertilizer-pesticide.interface';
import { CreateFertiliserPesticideDTO } from './dto/create-fert-pest.dto';
import { UpdateFertiliserPesticideDTO } from './dto/update-fert-pest.dto';
import { Financial } from './interfaces/financial.interface';
import { CreateFinancialDto } from './dto/financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { CropActivity } from './interfaces/activities.interface';
import { CropActivityDto } from './dto/activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CreatePestDiseaseIssueDto } from './dto/pest-disease.dto';
import { PestDiseaseIssue } from './interfaces/pest-disease.interface';
import { UpdatePestDiseaseIssueDto } from './dto/update-pest-disease.dto';

@Injectable()
export class CropsService {
  constructor(
    @Inject(CROP_MODEL) private cropModel: Model<Crop>,
    @Inject(USER_MODEL) private userModel: Model<User>,
    @Inject(IRRIGATION_MODEL) private irrigationModel: Model<Irrigation>,
    @Inject(FARM_MODEL) private farmModel: Model<Farm>,
    @Inject(FERTILIZER_PESTICIDE_MODEL)
    private fertilizer_pesticideModel: Model<FertiliserPesticide>,
    @Inject(FINANCIAL_MODE) private financialModel: Model<Financial>,
    @Inject(ACTIVITY_MODEL) private activityModel: Model<CropActivity>,
    @Inject(PEST_DISEASE_MODEL)
    private pestdiseaseModel: Model<PestDiseaseIssue>,
  ) {}

  /////////////////////////// CROPS /////////////////////////////

  async addCrop(
    adminId: string,
    createCropDto: CreateCropDto,
  ): Promise<ResponseDto> {
    try {
      //check farm using adminId in dto
      const farm = await this.farmModel.findOne({ adminId });
      if (!farm) {
        return ResponseDto.errorResponse('Farm not found');
      }
      // check if the crop is not already there using cropname
      const existingCrop = await this.cropModel.findOne({
        $and: [
          { adminId: adminId },
          { cropName: createCropDto.cropName },
          { cropType: createCropDto.cropType },
          { location: createCropDto.location },
          { plantingType: createCropDto.plantingType },
          { anticipatedHarvestDate: createCropDto.anticipatedHarvestDate },
        ],
      });
      if (existingCrop) {
        return ResponseHandler.handleBadRequest(
          'Crop already exists, please try again',
        );
      }

      const crop = await this.cropModel.create({
        adminId: adminId,
        ...createCropDto,
      });

      const createdCrop = await this.cropModel.findById(crop._id);

      if (!createdCrop) {
        return ResponseDto.errorResponse('Failed to create crop record');
      }

      const addCropToFarm = await this.farmModel.findByIdAndUpdate(farm._id, {
        $push: { crops: createdCrop._id },
      });
      console.log(addCropToFarm);
      console.log(addCropToFarm);
      console.log(addCropToFarm);
      if (!addCropToFarm) {
        await this.cropModel.findByIdAndDelete(crop._id);
        return ResponseDto.errorResponse('Failed to add Crop to farm');
      }

      return ResponseDto.successResponse('Crop record created', createdCrop);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse('Something went wrong adding crop');
    }
  }

  async getCrops(adminId: string): Promise<ResponseDto> {
    try {
      const farm = await this.farmModel.findOne({ adminId });
      if (!farm) {
        return ResponseDto.errorResponse('Farm not found');
      }

      const crops = await this.cropModel.find({
        adminId: adminId,
        _id: { $in: farm.crops },
      });

      if (!crops || crops.length === 0) {
        return ResponseDto.errorResponse('No available crops at the moment');
      }

      return ResponseDto.successResponse(
        `${crops.length} Crops fetched`,
        crops,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse('Something went wrong, fetching crops');
    }
  }

  async getCrop(id: string): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);
      if (!crop) {
        return ResponseDto.errorResponse('Failed to fetch crop');
      }
      return ResponseDto.successResponse(`${crop?.cropName} fetched`, crop);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse('Something went wrong, fetching crop');
    }
  }

  async updateCrop(
    id: string,
    updateCropDto: UpdateCropDto,
  ): Promise<ResponseDto> {
    try {
      const updatedCrop = await this.cropModel
        .findByIdAndUpdate(id, updateCropDto, { new: true })
        .exec();
      if (!updateCropDto) {
        return ResponseDto.errorResponse('Crop not found');
      }

      return ResponseDto.successResponse('Crop updated', updatedCrop);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, updating crop record',
      );
    }
  }

  async deleteCrop(id: string): Promise<ResponseDto> {
    try {
      const deletedCrop = await this.cropModel.findByIdAndDelete(id);
      if (!deletedCrop) {
        return ResponseDto.errorResponse('Failed to delete crop');
      }

      return ResponseDto.successResponse(
        `${deletedCrop?.cropName} deleted`,
        null,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, while deleting crop',
      );
    }
  }

  ////////////////////// IRRIGATION //////////////////////////////

  async addIrrigation(
    adminId: string,
    id: string,
    createIrrigationDto: CreateIrrigationDto,
  ): Promise<ResponseDto> {
    try {
      // after fetching a specific crop that id can be passed to the irrigation url
      const crop = await this.cropModel.findById(id);

      if (!crop) {
        return ResponseDto.errorResponse('Cannot find crop');
      }

      const irrigation = await this.irrigationModel.create({
        ...createIrrigationDto,
        crop: id,
        adminId,
      });

      const createdIrrigation = await this.irrigationModel
        .findById(irrigation._id)
        .populate('crop');

      if (!createdIrrigation) {
        return ResponseDto.errorResponse('Failed to create irrigation record');
      }

      return ResponseDto.successResponse(
        'Irrigation record created',
        createdIrrigation,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, creating irrigation record',
      );
    }
  }

  async getIrrigationRecordById(id: string): Promise<ResponseDto> {
    try {
      const irrigation = await this.irrigationModel
        .findById(id)
        .populate('crop');
      if (!irrigation) {
        return ResponseDto.errorResponse('Failed to fetch irrigation record');
      }

      return ResponseDto.successResponse(
        'Irrigation record fetched',
        irrigation,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching irrigation record',
      );
    }
  }

  async getIrrigationsForCrop(id: string): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);

      if (!crop) {
        return ResponseDto.errorResponse('Failed to fetch crop');
      }
      const irrigations = await this.irrigationModel
        .find({ crop: id })
        .populate('crop');

      if (!irrigations || irrigations.length === 0) {
        return ResponseDto.errorResponse(
          'No available irrigations at the moment for ' + crop?.cropName,
        );
      }

      return ResponseDto.successResponse('Irrigations fetched', irrigations);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching irrigation records',
      );
    }
  }

  async getAllFarmIrrigations(adminId: string): Promise<ResponseDto> {
    try {
      const irrigations = await this.irrigationModel
        .find({ adminId })
        .populate('crop');

      if (!irrigations || irrigations.length === 0) {
        return ResponseDto.errorResponse('No available irrigation records');
      }

      return ResponseDto.successResponse(
        'Irrigations records fetched',
        irrigations,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong,fetching farm irrigation records',
      );
    }
  }

  async updateIrrigation(
    id: string,
    updateIrrigationDto: UpdateIrrigationDto,
  ): Promise<ResponseDto> {
    try {
      const updatedIrrigation = await this.irrigationModel
        .findByIdAndUpdate(id, updateIrrigationDto, { new: true })
        .exec();

      if (!updatedIrrigation) {
        return ResponseDto.errorResponse('Failed to update irrigation');
      }

      return ResponseDto.successResponse(
        'Irrigation updated',
        updatedIrrigation,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, updating irrigation record',
      );
    }
  }

  async deleteIrrigation(id: string): Promise<ResponseDto> {
    try {
      const deletedIrrigation = await this.irrigationModel
        .findByIdAndDelete(id)
        .exec();

      if (!deletedIrrigation) {
        return ResponseDto.errorResponse('Failed to delete irrigation');
      }

      return ResponseDto.successResponse('Irrigation deleted', null);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, deleting irrigation record',
      );
    }
  }

  ///////////////////////  FERTLISER AND PESTICIDE ////////////////////////

  async addFertiliserPesticide(
    adminId: string,
    id: string,
    createFertlizerPesticideDto: CreateFertiliserPesticideDTO,
  ): Promise<ResponseDto> {
    try {
      const farm = await this.farmModel.findOne({ adminId });
      if (!farm) {
        return ResponseDto.errorResponse('Invalid adminId');
      }
      const crop = await this.cropModel.findById(id);
      if (!crop) {
        return ResponseDto.errorResponse('Cannot find crop');
      }

      const fert_pest = await this.fertilizer_pesticideModel.create({
        ...createFertlizerPesticideDto,
        crop: id,
        adminId,
      });

      const createdFertPest = await this.fertilizer_pesticideModel.findById(
        fert_pest._id,
      );

      if (!createdFertPest) {
        return ResponseDto.errorResponse(
          'Failed to add ' + createFertlizerPesticideDto.recordType + ' record',
        );
      }

      return ResponseDto.successResponse(
        `Created ${createFertlizerPesticideDto.recordType} record`,
        createdFertPest,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, while creating ' +
          createFertlizerPesticideDto.recordType +
          ' record',
      );
    }
  }

  async getAllFertPestApplicationsForFarm(
    adminId: string,
  ): Promise<ResponseDto> {
    try {
      const farm = await this.farmModel.findOne({ adminId })
      .populate('crop');;
      if (!farm) {
        return ResponseDto.errorResponse('Invalid adminId');
      }

      const fert_pest = await this.fertilizer_pesticideModel.find({ adminId });
      if (!fert_pest || fert_pest.length === 0) {
        return ResponseDto.errorResponse('No available records');
      }

      return ResponseDto.successResponse('Records fetched', fert_pest);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching fertilizers and pesticide records for farm',
      );
    }
  }

  async getAllFertPestApplicationsForCrop(id: string): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);

      if (!crop) {
        return ResponseDto.errorResponse('Crop not found');
      }

      const records = await this.fertilizer_pesticideModel.find({
        crop: crop._id,
      });

      if (!records || records.length === 0) {
        return ResponseDto.errorResponse('No available records');
      }

      return ResponseDto.successResponse(
        `Fertilizer and pesticide records for ${crop?.cropName} fetched`,
        records,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching fertilizers and pesticide records for crop',
      );
    }
  }

  async getSpecificFertPestRecordById(id: string): Promise<ResponseDto> {
    try {
      const record = await this.fertilizer_pesticideModel.findById(id);
      if (!record) {
        return ResponseDto.errorResponse('Record not found');
      }

      return ResponseDto.successResponse('Record fetched', record);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching fertilizers and pesticide record',
      );
    }
  }

  async updateFertPestRecordById(
    id: string,
    updateFertPestDto: UpdateFertiliserPesticideDTO,
  ): Promise<ResponseDto> {
    try {
      const updatedRecord = await this.fertilizer_pesticideModel
        .findByIdAndUpdate(id, updateFertPestDto, { new: true })
        .exec();

      if (!updatedRecord) {
        return ResponseDto.errorResponse('Failed to update record');
      }

      return ResponseDto.successResponse('Record updated', updatedRecord);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, updating fertilizers and pesticide record',
      );
    }
  }

  async deleteFertPestRecordById(id: string): Promise<ResponseDto> {
    try {
      const deleteRecord = await this.fertilizer_pesticideModel
        .findByIdAndDelete(id)
        .exec();

      if (!deleteRecord) {
        return ResponseDto.errorResponse('Failed to delete record');
      }

      return ResponseDto.successResponse('Record deleted', null);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, deleting fertilizers and pesticide record',
      );
    }
  }

  ///////////////////// FINANCIAL ///////////////////////////////////////////

  async createFinancialRecord(
    adminId: string,
    id: string,
    createFinancialDto: CreateFinancialDto,
  ): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);
      if (!crop) {
        return ResponseDto.errorResponse('Crop not found');
      }

      const financial = await this.financialModel.create({
        ...createFinancialDto,
        crop: id,
        adminId,
      });

      const createdFinancial = await this.financialModel
        .findById(financial._id)
        .populate('crop');

      if (!createdFinancial) {
        return ResponseDto.errorResponse('Failed to create financial record');
      }

      return ResponseDto.successResponse(
        'Financial record created successfully',
        createdFinancial,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, creating financial record',
      );
    }
  }

  async getAllFinancialRecordsForFarm(adminId: string): Promise<ResponseDto> {
    try {
      const farm = await this.farmModel.findOne({ adminId });
      if (!farm) {
        return ResponseDto.errorResponse('Invalid adminId');
      }

      const financial = await this.financialModel.find({ adminId });
      if (!financial) {
        return ResponseDto.errorResponse('No available records');
      }

      return ResponseDto.successResponse('Records fetched', financial);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching financial records for farm',
      );
    }
  }

  async getAllFinancialRecordsForCrop(id: string): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);

      if (!crop) {
        return ResponseDto.errorResponse('Crop not found');
      }

      const records = await this.financialModel.find({ crop: crop._id });

      if (!records || records.length === 0) {
        return ResponseDto.errorResponse('No available records');
      }

      return ResponseDto.successResponse(
        `Financial records for ${crop?.cropName} fetched`,
        records,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching financial records for crop',
      );
    }
  }

  async getSpecificFinancialRecordById(id: string): Promise<ResponseDto> {
    try {
      const financialRecord = await this.financialModel.findById(id);
      if (!financialRecord) {
        return ResponseDto.errorResponse('Record not found');
      }

      return ResponseDto.successResponse('Record fetched', financialRecord);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching financial record',
      );
    }
  }

  async updateFinancialRecordById(
    id: string,
    updateFinancialDto: UpdateFinancialDto,
  ): Promise<ResponseDto> {
    try {
      const updatedRecord = await this.financialModel
        .findByIdAndUpdate(id, updateFinancialDto, { new: true })
        .exec();

      if (!updatedRecord) {
        return ResponseDto.errorResponse('Failed to update record');
      }

      return ResponseDto.successResponse('Record updated', updatedRecord);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, updating financial record',
      );
    }
  }

  async deleteFinancialRecordById(id: string): Promise<ResponseDto> {
    try {
      const deleteRecord = await this.financialModel
        .findByIdAndDelete(id)
        .exec();

      if (!deleteRecord) {
        return ResponseDto.errorResponse('Failed to delete record');
      }

      return ResponseDto.successResponse('Record deleted', null);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, deleting financial record',
      );
    }
  }

  ////////////////////ACTIVITY//////////////////////////////////////

  async createActivityRecord(
    id: string,
    adminId: string,
    createActivityDto: CropActivityDto,
  ): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);
      if (!crop) {
        return ResponseDto.errorResponse('Crop not found');
      }

      const activityExists = await this.activityModel.findOne({
        $and: [
          { adminId: adminId },
          { amountQuantity: createActivityDto.amountQuantity },
          { activityType: createActivityDto.activityType },
          { method: createActivityDto.method },
          { price: createActivityDto.price },
          { time: createActivityDto.time },
          { IoTDeviceData: createActivityDto.IoTDeviceData },
          { squareFootage: createActivityDto.squareFootage },
          { date: createActivityDto.date },
        ],
      });

      if (activityExists) {
        return ResponseDto.errorResponse(
          'An activity matching this one already exists',
        );
      }

      const activity = await this.activityModel.create({
        ...createActivityDto,
        cropId: crop._id,
        adminId: adminId,
      });

      const createdActivity = await this.activityModel
        .findById(activity._id)
        .populate('crop');

      if (!createdActivity) {
        return ResponseDto.errorResponse('Failed to create activity record');
      }

      return ResponseDto.successResponse(
        'Activity record created successfully',
        createdActivity,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, creating activity record',
      );
    }
  }

  async getAllActivityRecordsForFarm(adminId: string): Promise<ResponseDto> {
    try {
      const farm = await this.farmModel.findOne({ adminId });
      if (!farm) {
        return ResponseDto.errorResponse('Invalid adminId');
      }

      const activity = await this.activityModel.find({ adminId });
      if (!activity || activity.length === 0) {
        return ResponseDto.errorResponse('No available records');
      }

      return ResponseDto.successResponse('Records fetched', activity);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching activity records for farm',
      );
    }
  }

  async getAllActivityRecordsForCrop(id: string): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);

      if (!crop) {
        return ResponseDto.errorResponse('Crop not found');
      }

      const records = await this.activityModel.find({ cropId: crop._id });

      if (!records || records.length === 0) {
        return ResponseDto.errorResponse('No available records');
      }

      return ResponseDto.successResponse(
        `Activity records for ${crop?.cropName} fetched`,
        records,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching activity records for crop',
      );
    }
  }

  async getSpecificActivityRecordById(id: string): Promise<ResponseDto> {
    try {
      const activityRecord = await this.activityModel.findById(id);
      if (!activityRecord) {
        return ResponseDto.errorResponse('Record not found');
      }

      return ResponseDto.successResponse('Record fetched', activityRecord);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching activity record',
      );
    }
  }

  async updateActivityRecordById(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<ResponseDto> {
    try {
      const updatedRecord = await this.activityModel
        .findByIdAndUpdate(id, updateActivityDto, { new: true })
        .exec();

      if (!updatedRecord) {
        return ResponseDto.errorResponse('Failed to update record');
      }

      return ResponseDto.successResponse('Record updated', updatedRecord);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, updating activity record',
      );
    }
  }

  async deleteActivityRecordById(id: string): Promise<ResponseDto> {
    try {
      const deleteRecord = await this.activityModel
        .findByIdAndDelete(id)
        .exec();

      if (!deleteRecord) {
        return ResponseDto.errorResponse('Failed to delete record');
      }

      return ResponseDto.successResponse('Record deleted', null);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, deleting activity record',
      );
    }
  }

  ////////////////////////////////////PestDiseaseIssue////////////////////////////////

  async createPestDiseaseIssue(
    id: string,
    adminId: string,
    createPestDiseaseIssueDto: CreatePestDiseaseIssueDto,
  ): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);
      if (!crop) {
        return ResponseDto.errorResponse('Crop not found');
      }

      const pestDiseaseIssueExists = await this.pestdiseaseModel.findOne({
        cropId: id,
        adminId: id,
        issueType: createPestDiseaseIssueDto.issueType,
        severity: createPestDiseaseIssueDto.severity,
        areaAffected: createPestDiseaseIssueDto.areaAffected,
        notes: createPestDiseaseIssueDto.notes,
      });

      if (pestDiseaseIssueExists) {
        return ResponseDto.errorResponse('Pest disease issue already exists');
      }

      const pestDiseaseIssue = await this.pestdiseaseModel.create({
        ...createPestDiseaseIssueDto,
        cropId: crop._id,
        adminId,
      });

      const createPestDisease = await this.pestdiseaseModel.findById(
        pestDiseaseIssue._id,
      );

      if (!createPestDisease) {
        return ResponseDto.errorResponse('Failed to create pest disease issue');
      }

      return ResponseDto.successResponse(
        'Pest disease issue created successfully',
        createPestDisease,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, creating pest disease issue',
      );
    }
  }

  async getAllPestDiseaseIssueForFarm(adminId: string): Promise<ResponseDto> {
    try {
      const farm = await this.farmModel.findOne({ adminId });
      if (!farm) {
        return ResponseDto.errorResponse('Farm not found');
      }
      const pestDisease = await this.pestdiseaseModel.find({ adminId });
      if (!pestDisease || pestDisease.length === 0) {
        return ResponseDto.errorResponse('No available records');
      }

      return ResponseDto.successResponse('Records fetched', pestDisease);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching pest disease issue',
      );
    }
  }

  async getAllPestDiseaseIssueForCrop(id: string): Promise<ResponseDto> {
    try {
      const crop = await this.cropModel.findById(id);
      if (!crop) {
        return ResponseDto.errorResponse('Crop not found');
      }

      const pestDisease = await this.pestdiseaseModel.find({ cropId: id });

      if (!pestDisease || pestDisease.length === 0) {
        return ResponseDto.errorResponse('No available records');
      }

      return ResponseDto.successResponse('Records fetched', pestDisease);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching pest disease issue',
      );
    }
  }

  async getPestDiseaseIssueById(id: string): Promise<ResponseDto> {
    try {
      const pestDisease = await this.pestdiseaseModel.findById(id);
      if (!pestDisease) {
        return ResponseDto.errorResponse('Pest disease not found');
      }

      return ResponseDto.successResponse('Pest disease fetched', pestDisease);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, fetching pest disease issue',
      );
    }
  }

  async updatePestDiseaseIssueById(
    id: string,
    updatePestDiseaseIssueDto: UpdatePestDiseaseIssueDto,
  ): Promise<ResponseDto> {
    try {
      const updatedRecord = await this.pestdiseaseModel
        .findByIdAndUpdate(id, updatePestDiseaseIssueDto, { new: true })
        .exec();

      if (!updatedRecord) {
        return ResponseDto.errorResponse('Failed to update record');
      }

      return ResponseDto.successResponse(
        'Record updated successfully',
        updatedRecord,
      );
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, updating pest disease issue',
      );
    }
  }

  async deletePestDiseaseIssueById(id: string): Promise<ResponseDto> {
    try {
      const deleteRecord = await this.pestdiseaseModel
        .findByIdAndDelete(id)
        .exec();

      if (!deleteRecord) {
        return ResponseDto.errorResponse('Failed to delete record');
      }

      return ResponseDto.successResponse('Record deleted', null);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, deleting pest disease issue',
      );
    }
  }
}
