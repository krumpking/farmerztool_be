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
        cropType: crop.cropType
      });

      const createdIrrigation = await this.irrigationModel
        .findById(irrigation._id)
        .populate('crop')

      if (!createdIrrigation) {
        return ResponseDto.errorResponse('Failed to create irrigation record');
      }

      await this.cropModel.findByIdAndUpdate(crop._id, {$push: {irrigations: createdIrrigation._id}});

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
        .populate('crop')
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
        .populate('crop')

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
        .populate('crop')

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
        cropType: crop.cropType
      });

      const createdFertPest = await this.fertilizer_pesticideModel.findById(
        fert_pest._id,
      );

      if (!createdFertPest) {
        return ResponseDto.errorResponse(
          'Failed to add ' + createFertlizerPesticideDto.recordType + ' record',
        );
      }

      await this.cropModel.findByIdAndUpdate(id, {$push: {fertPest: createdFertPest._id}});

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
      const farm = await this.farmModel.findOne({ adminId });
      
      if (!farm) {
        return ResponseDto.errorResponse('Invalid adminId');
      }

      const fert_pest = await this.fertilizer_pesticideModel.find({ adminId }).populate('crop');
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
        cropType: crop.cropType
      });

      const createdFinancial = await this.financialModel
        .findById(financial._id)
        .populate('crop')

      if (!createdFinancial) {
        return ResponseDto.errorResponse('Failed to create financial record');
      }

      await this.cropModel.findByIdAndUpdate(id, {
        $push: { financials: createdFinancial._id },
      });

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

      const financial = await this.financialModel.find({ adminId }).populate('crop');
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
        crop: crop._id,
        adminId: adminId,
        cropType: crop.cropType
      });

      const createdActivity = await this.activityModel
        .findById(activity._id)
        .populate('crop')

      if (!createdActivity) {
        return ResponseDto.errorResponse('Failed to create activity record');
      }

      await this.cropModel
        .findByIdAndUpdate(crop._id, {
          $push: { activities: createdActivity._id },
        })
        .exec();

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
      const farm = await this.farmModel.findOne({ adminId })

      if (!farm) {
        return ResponseDto.errorResponse('Invalid adminId');
      }

      const activity = await this.activityModel.find({ adminId }).populate('crop');
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

      const records = await this.activityModel.find({ crop: crop._id });

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
        crop: id,
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
        crop: crop._id,
        adminId,
        cropType: crop.cropType
      });

      const createPestDisease = await this.pestdiseaseModel.findById(
        pestDiseaseIssue._id,
      );

      if (!createPestDisease) {
        return ResponseDto.errorResponse('Failed to create pest disease issue');
      }

      await this.cropModel.findByIdAndUpdate(id, {
        $push: { pestDiseasesIssue: createPestDisease._id },
      });

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
      const farm = await this.farmModel.findOne({ adminId })
      if (!farm) {
        return ResponseDto.errorResponse('Farm not found');
      }
      const pestDisease = await this.pestdiseaseModel.find({ adminId }).populate('crop');
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

      const pestDisease = await this.pestdiseaseModel.find({ crop: id });

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


  ///////////////////////// MULTIPLE UPDATES ////////////////////////////

  async getAllCropsTypesForAdmin(adminId: string): Promise<ResponseDto>{
    try {
      const crops = await this.cropModel.find({ adminId });
  
      if (!crops || crops.length === 0) {
          return ResponseHandler.handleNotFound("No available crops");
      }
  
      const cropTypes: string[] = [];
      
      crops.forEach(item => {
          const cropType = item.cropType;
          // Check if cropType is not null or undefined and not already in the cropTypes array
          if (cropType !== null && cropType !== undefined && !cropTypes.includes(cropType)) {
              cropTypes.push(cropType);
          }
      });
  
      return ResponseHandler.handleOk("CropTypes fetched", cropTypes);
  } catch (error) {
      console.error(error);
      return ResponseHandler.handleInternalServerError("An error occurred while fetching crop types");
  }
  }

  async updateActivityForAllCrops(adminId: string, cropType: string, updateActivityDto: UpdateActivityDto): Promise<ResponseDto> {
    try {
      const crops = await this.cropModel.find({ adminId, cropType });
  
      if (!crops || crops.length === 0) {
        return ResponseHandler.handleNotFound("No crops found for the specified type and admin");
      }
  
      const updatedActivites = [];
  
      // Loop through each crops and update the activity records
      for (const crop of crops) {
        const existingActivity = await this.activityModel.findOne({ 
          adminId: crop.adminId, 
          crop: crop._id 
        });
  
        if (existingActivity) {
          const updatedActivity = await this.activityModel.findByIdAndUpdate(
            existingActivity._id,
            updateActivityDto,
            { new: true }
          );
  
          if (updatedActivity) {
            updatedActivites.push(updatedActivity);
          } else {
            console.log(`Failed to update feed for crop: ${crop.cropName}`);
          }
        } else {
          console.log(`No existing activity record found for crop: ${crop.cropName}`);
        }
      }
  
      if (updatedActivites.length === 0) {
        return ResponseHandler.handleBadRequest("No activity records were updated.");
      }
  
      return ResponseHandler.handleOk("Activites records updated successfully for all crops", updatedActivites);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to update activies for all crops");
    }
  }


  async updateIrrigationForAllCrops(adminId: string, cropType: string, updateIrrigationDto: UpdateIrrigationDto): Promise<ResponseDto> {
    try {
      const crops = await this.cropModel.find({ adminId, cropType });
  
      if (!crops || crops.length === 0) {
        return ResponseHandler.handleNotFound("No crops found for the specified type and admin");
      }
  
      const updatedIrrigations = [];
  
      // Loop through each crop and update the irrigation records
      for (const crop of crops) {
        const existingIrigation = await this.irrigationModel.findOne({ 
          adminId: crop.adminId, 
          crop: crop._id 
        });
  
        if (existingIrigation) {
          const updatedIrrigation = await this.irrigationModel.findByIdAndUpdate(
            existingIrigation._id,
            updateIrrigationDto,
            { new: true }
          );
  
          if (updatedIrrigation) {
            updatedIrrigations.push(updatedIrrigation);
          } else {
            console.log(`Failed to update irrigation for crop: ${crop.cropName}`);
          }
        } else {
          console.log(`No existing irrigation record found for crop: ${crop.cropName}`);
        }
      }
  
      if (updatedIrrigations.length === 0) {
        return ResponseHandler.handleBadRequest("No irrigation records were updated.");
      }
  
      return ResponseHandler.handleOk("Irrigation records updated successfully for all crops", updatedIrrigations);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to update irrigations for all crops");
    }
  }

  async updateFinancialRecordsForAllCrops(adminId: string, cropType: string, updateFinancialDto: UpdateFinancialDto): Promise<ResponseDto> {
    try {
      const crops = await this.cropModel.find({ adminId, cropType });
  
      if (!crops || crops.length === 0) {
        return ResponseHandler.handleNotFound("No crops found for the specified type and admin");
      }
  
      const updatedFinancialRecords = [];
  
      // Loop through each crop and update the financial records
      for (const crop of crops) {
        const existingFinancialRecord = await this.financialModel.findOne({ 
          adminId: crop.adminId, 
          crop: crop._id 
        });
  
        if (existingFinancialRecord) {
          const updatedFinancialRecord = await this.financialModel.findByIdAndUpdate(
            existingFinancialRecord._id,
            updateFinancialDto,
            { new: true }
          );
  
          if (updatedFinancialRecord) {
            updatedFinancialRecords.push(updatedFinancialRecord);
          } else {
            console.log(`Failed to update financial record for crop: ${crop.cropName}`);
          }
        } else {
          console.log(`No existing financial record found for crop: ${crop.cropName}`);
        }
      }
  
      if (updatedFinancialRecords.length === 0) {
        return ResponseHandler.handleBadRequest("No financial records were updated.");
      }
  
      return ResponseHandler.handleOk("Financial records updated successfully for all crops", updatedFinancialRecords);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to update financial records for all crops");
    }
  }

  async updateFertilizerPesticideRecordsForAllCrops(adminId: string, cropType: string, updateFertPestDto: UpdateFertiliserPesticideDTO): Promise<ResponseDto> {
    try {
      const crops = await this.cropModel.find({ adminId, cropType });
  
      if (!crops || crops.length === 0) {
        return ResponseHandler.handleNotFound("No crops found for the specified type and admin");
      }
  
      const updatedFertPestRecords = [];
  
      // Loop through each crop and update the fertilizer/pesticide records
      for (const crop of crops) {
        const existingFertPestRecord = await this.fertilizer_pesticideModel.findOne({ 
          adminId: crop.adminId, 
          crop: crop._id 
        });
  
        if (existingFertPestRecord) {
          const updatedFertPestRecord = await this.fertilizer_pesticideModel.findByIdAndUpdate(
            existingFertPestRecord._id,
            updateFertPestDto,
            { new: true }
          );
  
          if (updatedFertPestRecord) {
            updatedFertPestRecords.push(updatedFertPestRecord);
          } else {
            console.log(`Failed to update fertilizer/pesticide record for crop: ${crop.cropName}`);
          }
        } else {
          console.log(`No existing fertilizer/pesticide record found for crop: ${crop.cropName}`);
        }
      }
  
      if (updatedFertPestRecords.length === 0) {
        return ResponseHandler.handleBadRequest("No fertilizer/pesticide records were updated.");
      }
  
      return ResponseHandler.handleOk("Fertilizer/Pesticide records updated successfully for all crops", updatedFertPestRecords);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to update fertilizer/pesticide records for all crops");
    }
  }


}
