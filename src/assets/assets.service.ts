import { Inject, Injectable } from '@nestjs/common';
import { ASSET_FINANCIAL_MODEL, ASSET_INSPECTION_MODEL, ASSET_LOCATION_MODEL, ASSET_MANAGEMENT_MODEL } from './constants/assets.constants';
import { Model } from 'mongoose';
import { Asset } from './interfaces/asset-management.interface';
import { CreateAssetDTO } from './dto/asset-management.dto';
import { ResponseDto } from 'src/common/response.dto';
import { USER_MODEL } from 'src/auth/constants/auth.constants';
import { User } from 'src/auth/interfaces/user.interface';
import { UpdateAssetDto } from './dto/update-asset-management.dto';
import { Inspection } from './interfaces/asset-inspection.interface';
import { CreateInspectionDTO } from './dto/asset-inspection.dto';
import { UpdateAssetInpsectionDto } from './dto/update-asset-inspection';
import { AssetFinancial } from './interfaces/asset-financial.interface';
import { CreateAssetFinancialDTO } from './dto/asset-financial.dto';
import { UpdateAssetFinancial } from './dto/update-asset-financial.dto';
import { AssetLocation } from './interfaces/asset-location.interface';
import { CreateAssetLocationDto } from './dto/asset-location.dto';
import { UpdateAssetLocationDto } from './dto/update-asset-location.dto';

@Injectable()
export class AssetsService {
    constructor(
        @Inject(ASSET_MANAGEMENT_MODEL) private readonly assetModel: Model<Asset>,
        @Inject(ASSET_INSPECTION_MODEL) private readonly assetInspectionModel: Model<Inspection>,
        @Inject(ASSET_FINANCIAL_MODEL) private readonly assetFinancialModel: Model<AssetFinancial>,
        @Inject(ASSET_LOCATION_MODEL) private readonly assetLocationModel: Model<AssetLocation>,
        @Inject(USER_MODEL) private readonly userModel: Model<User>,
    ) { }

    async createAsset(adminId: string, createAssetDto: CreateAssetDTO): Promise<ResponseDto> {
        try {
            const user = await this.userModel.findOne({ adminId });

            if (!user) {
                return ResponseDto.errorResponse("User not found");
            }

            const asset = await this.assetModel.create({
                ...createAssetDto,
                adminId
            });

            const createdAsset = await this.assetModel.findById(asset._id);

            if (!createdAsset) {
                return ResponseDto.errorResponse("Failed to create asset");
            }

            return ResponseDto.successResponse("Asset created", createdAsset);

        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, creating asset")
        }
    }

    async getAllAssetsForAdmin(adminId: string): Promise<ResponseDto> {
        try {
            const assets = await this.assetModel.find({ adminId });
            if (!assets || assets.length === 0) {
                return ResponseDto.errorResponse("No assets found");
            }
            return ResponseDto.successResponse("Assets fetched", assets);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching assets")
        }
    }

    async getSpecificAssetById(id: string): Promise<ResponseDto> {
        try {
            const asset = await this.assetModel.findById(id);
            if (!asset) {
                return ResponseDto.errorResponse("Asset not found");
            }
            return ResponseDto.successResponse("Asset fetched", asset);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching asset")
        }
    }

    async updateAsset(id: string, updateAssetDto: UpdateAssetDto): Promise<ResponseDto> {
        try {
            const updatedAsset = await this.assetModel.findByIdAndUpdate(id, updateAssetDto, { new: true }).exec();
            if (!updatedAsset) {
                return ResponseDto.errorResponse("Asset not found");
            }
            return ResponseDto.successResponse("Asset updated", updatedAsset);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, updating asset")
        }
    }

    async deleteAsset(id: string): Promise<ResponseDto> {
        try {
            const deletedAsset = await this.assetModel.findByIdAndDelete(id);
            if (!deletedAsset) {
                return ResponseDto.errorResponse("Asset not found");
            }
            return ResponseDto.successResponse("Asset deleted", null);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, deleting asset")
        }
    }


    //////////////////////////////////INPSECTION//////////////////////////////////////

    async createAssetInpsection(id: string, adminId: string, createInspectionDto: CreateInspectionDTO): Promise<ResponseDto> {
        try {
            const user = await this.userModel.findOne({ adminId });

            if (!user) {
                return ResponseDto.errorResponse("User not found");
            }

            const inspection = await this.assetInspectionModel.create({
                ...createInspectionDto,
                assetId: id,
                adminId
            });

            const createdInspection = await this.assetInspectionModel.findById(inspection._id);

            if (!createdInspection) {
                return ResponseDto.errorResponse("Failed to create inspection");
            }

            return ResponseDto.successResponse("Inspection created", createdInspection);

        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, creating inspection")
        }
    }

    async getAllInspectionRecordsForAsset(id: string): Promise<ResponseDto> {
        try {
            const inspections = await this.assetInspectionModel.find({ assetId: id });
            if (!inspections || inspections.length === 0) {
                return ResponseDto.errorResponse("No inspections found");
            }
            return ResponseDto.successResponse("Inspections fetched", inspections);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching inspections")
        }
    }

    async getSpecificInspection(id: string): Promise<ResponseDto> {
        try {
            const inspection = await this.assetInspectionModel.findById(id).populate("assetId");
            if (!inspection) {
                return ResponseDto.errorResponse("Inspection not found");
            }
            return ResponseDto.successResponse("Inspection fetched", inspection);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching inspection")
        }
    }

    async getAllInspectionRecordsForAdmin(adminId: string): Promise<ResponseDto> {
        try {
            const inspections = await this.assetInspectionModel.find({ adminId });
            if (!inspections || inspections.length === 0) {
                return ResponseDto.errorResponse("No inspections found");
            }
            return ResponseDto.successResponse("Inspections fetched", inspections);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching inspections")
        }
    }

    async updateInspection(id: string, updateInspectionDto: UpdateAssetInpsectionDto): Promise<ResponseDto> {
        try {
            const updatedInspection = await this.assetInspectionModel.findByIdAndUpdate(id, updateInspectionDto, { new: true }).exec();
            if (!updatedInspection) {
                return ResponseDto.errorResponse("Inspection not found");
            }
            return ResponseDto.successResponse("Inspection updated", updatedInspection);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, updating inspection")
        }
    }


    async deleteInspection(id: string): Promise<ResponseDto> {
        try {
            const deletedInspection = await this.assetInspectionModel.findByIdAndDelete(id);
            if (!deletedInspection) {
                return ResponseDto.errorResponse("Inspection not found");
            }
            return ResponseDto.successResponse("Inspection deleted", null);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, deleting inspection")
        }
    }


    /////////////////////////ASSET FINANCIAL///////////////////////////////////////


    async createAssetFinancial(id: string, adminId: string, createAssetFinancialDto: CreateAssetFinancialDTO): Promise<ResponseDto> {
        try {
            const asset = await this.assetModel.findById(id);
            if (!asset) {
                return ResponseDto.errorResponse("Asset not found");
            }
            const financial = await this.assetFinancialModel.create({
                ...createAssetFinancialDto,
                assetId: id,
                adminId
            });
            const createdFinancial = await this.assetFinancialModel.findById(financial._id);
            if (!createdFinancial) {
                return ResponseDto.errorResponse("Failed to create financial");
            }
            return ResponseDto.successResponse("Financial created", createdFinancial);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, creating financial")
        }
    }


    async getAllFinancialRecordsForAsset(id: string): Promise<ResponseDto> {
        try {
            const financials = await this.assetFinancialModel.find({ assetId: id });
            if (!financials || financials.length === 0) {
                return ResponseDto.errorResponse("No financials found");
            }
            return ResponseDto.successResponse("Financials fetched", financials);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching financials")
        }
    }

    async getAllFinancialRecordsForAdmin(adminId: string): Promise<ResponseDto> {
        try {
            const financials = await this.assetFinancialModel.find({ adminId });
            if (!financials || financials.length === 0) {
                return ResponseDto.errorResponse("No financials found");
            }
            return ResponseDto.successResponse("Financials fetched", financials);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching financials")
        }
    }


    async getSpecificFinancial(id: string): Promise<ResponseDto> {
        try {
            const financial = await this.assetFinancialModel.findById(id).populate("assetId");
            if (!financial) {
                return ResponseDto.errorResponse("Financial not found");
            }
            return ResponseDto.successResponse("Financial fetched", financial);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching financial")
        }
    }


    async updateFinancial(id: string, updateAssetFinancialDto: UpdateAssetFinancial): Promise<ResponseDto> {
        try {
            const updatedFinancial = await this.assetFinancialModel.findByIdAndUpdate(id, updateAssetFinancialDto, { new: true }).exec();
            if (!updatedFinancial) {
                return ResponseDto.errorResponse("Financial not found");
            }
            return ResponseDto.successResponse("Financial updated", updatedFinancial);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, updating financial")
        }
    }


    async deleteFinancial(id: string): Promise<ResponseDto> {
        try {
            const deletedFinancial = await this.assetFinancialModel.findByIdAndDelete(id);
            if (!deletedFinancial) {
                return ResponseDto.errorResponse("Financial not found");
            }
            return ResponseDto.successResponse("Financial deleted", null);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, deleting financial")
        }
    }


    /////////////////ASSET LOCATION /////////////////////////////////////


    async createAssetLocation(id: string, adminId: string, createAssetLocationDto: CreateAssetLocationDto): Promise<ResponseDto> {
        try {
            const user = await this.userModel.findOne({ adminId });
            if (!user) {
                return ResponseDto.errorResponse("User not found");
            }

            const { finishTime, startTime } = createAssetLocationDto?.userAssignment;
            const userAssignment = {
                userId: user._id,
                startTime: startTime,
                finishTime: finishTime
            }

            const location = await this.assetLocationModel.create({
                ...createAssetLocationDto,
                userAssignment: userAssignment,
                assetId: id,
                adminId
            });
            const createdLocation = await this.assetLocationModel.findById(location._id);
            if (!createdLocation) {
                return ResponseDto.errorResponse("Failed to create location");
            }
            return ResponseDto.successResponse("Location created", createdLocation);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, creating location")
        }
    }


    async getAllLocationsForAsset(id: string): Promise<ResponseDto> {
        try {
            const locations = await this.assetLocationModel.find({ assetId: id });
            if (!locations || locations.length === 0) {
                return ResponseDto.errorResponse("No locations found");
            }
            return ResponseDto.successResponse("Locations fetched", locations);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching locations")
        }
    }

    async getAllLocationsForAdmin(adminId: string): Promise<ResponseDto> {
        try {
            const locations = await this.assetLocationModel.find({ adminId });
            if (!locations || locations.length === 0) {
                return ResponseDto.errorResponse("No locations found");
            }
            return ResponseDto.successResponse("Locations fetched", locations);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching locations")
        }
    }



    async getSpecificLocation(id: string): Promise<ResponseDto> {
        try {
            const location = await this.assetLocationModel.findById(id).populate("assetId");
            if (!location) {
                return ResponseDto.errorResponse("Location not found");
            }
            return ResponseDto.successResponse("Location fetched", location);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, fetching location")
        }
    }

    async updateLocation(id: string, updateAssetLocationDto: UpdateAssetLocationDto): Promise<ResponseDto> {
        try {
            const updatedLocation = await this.assetLocationModel.findByIdAndUpdate(id, updateAssetLocationDto, { new: true }).exec();
            if (!updatedLocation) {
                return ResponseDto.errorResponse("Location not found");
            }
            return ResponseDto.successResponse("Location updated", updatedLocation);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, updating location")
        }
    }


    async deleteLocation(id: string): Promise<ResponseDto> {
        try {
            const deletedLocation = await this.assetLocationModel.findByIdAndDelete(id);
            if (!deletedLocation) {
                return ResponseDto.errorResponse("Location not found");
            }
            return ResponseDto.successResponse("Location deleted", null);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, deleting location")
        }
    }



}
