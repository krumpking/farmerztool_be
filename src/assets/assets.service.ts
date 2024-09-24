import { Inject, Injectable } from '@nestjs/common';
import { ASSET_MANAGEMENT_MODEL } from './constants/assets.constants';
import { Model } from 'mongoose';
import { Asset } from './interfaces/asset-management.interface';
import { CreateAssetDTO } from './dto/asset-management.dto';
import { ResponseDto } from 'src/common/response.dto';
import { USER_MODEL } from 'src/auth/constants/auth.constants';
import { User } from 'src/auth/interfaces/user.interface';
import { UpdateAssetDto } from './dto/update-asset-management.dto';

@Injectable()
export class AssetsService {
    constructor(
        @Inject(ASSET_MANAGEMENT_MODEL) private readonly assetModel: Model<Asset>,
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

    async updateAsset(id: string, updateAssetDto: UpdateAssetDto): Promise<ResponseDto>{
        try {
            const updatedAsset = await this.assetModel.findByIdAndUpdate(id, updateAssetDto, {new: true}).exec();
            if (!updatedAsset) {
                return ResponseDto.errorResponse("Asset not found");
            }
            return ResponseDto.successResponse("Asset updated", updatedAsset);
        } catch (error) {
            console.log(error);
            return ResponseDto.errorResponse("Something went wrong, updating asset")
        }
    }

    async deleteAsset(id: string): Promise<ResponseDto>{
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

}
