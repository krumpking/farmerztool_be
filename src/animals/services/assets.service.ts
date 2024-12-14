import { Inject, Injectable } from "@nestjs/common";
import { User as UserInterface } from "../animals.service";
import { Model } from "mongoose";
import { ANIMAL_ASSET_MODEL, ANIMAL_MODEL } from "../constants/animal.constants";
import { AnimalAsset } from "../interfaces/animalAsset.interface";
import { Animal } from "../interfaces/animal.interface";
import { ResponseDto, ResponseHandler } from "src/common/response.dto";
import { CreateAnimalAssetDto } from "../dto/animalAsset.dto";
import { UpdateAnimalAssetDTO } from "../dto/updateAnimalAsset.dto";

@Injectable()

export class AnimalAssetService {
    constructor(
        @Inject(ANIMAL_ASSET_MODEL) private animalAssetModel: Model<AnimalAsset>,
        @Inject(ANIMAL_MODEL) private animalModel: Model<Animal>,
    ) { }

    async addAsset(user: UserInterface, animalId: string, createAnimalAssetDto: CreateAnimalAssetDto): Promise<ResponseDto> {
        try {
            const animal = await this.animalModel.findById(animalId);
            if (!animal) {
                return ResponseHandler.handleNotFound('Animal not found');
            }

            const animalAssetInstance = await this.animalAssetModel.create({
                ...createAnimalAssetDto,
                adminId: user.adminId,
                addedBy: user.id,
                animalId: animal.animalId,
                animal: animalId,
                addedByType: user.userType
            })



            if (!animalAssetInstance) {
                return ResponseHandler.handleBadRequest('Asset not created');
            }

            await this.animalModel.findByIdAndUpdate(animalId, {
                $push: {
                    animalAssets: animalAssetInstance._id
                }
            })

            return ResponseHandler.handleCreated('Asset created successfully', animalAssetInstance);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to add asset: " + error);
        }

    }


    async getAssetRecord(id: string): Promise<ResponseDto> {
        try {
            const asset = await this.animalAssetModel.findById(id).populate('animal').populate('addedBy', '-password').exec();
            if (!asset) {
                return ResponseHandler.handleNotFound('Asset not found');
            }
            return ResponseHandler.handleOk('Asset fetched successfully', asset);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch asset: " + error);
        }
    }

    async getAssetsForAnimal(animalId: string, page: number): Promise<ResponseDto> {
        try {
            const limit = 10;
            const offset = page * limit;
            const assets = await this.animalAssetModel.find({ animal: animalId }).skip(offset).limit(limit).populate('animal').populate('addedBy', '-password').exec();
            if (!assets || assets.length === 0) {
                return ResponseHandler.handleNotFound("No available assets records")
            }
            return ResponseHandler.handleOk(`${assets.length} assets records fetched`, assets);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, while fetching all assets records: " + error);
        }
    }

    async getAssetsForAdmin(adminId: string, page: number): Promise<ResponseDto> {
        try {
            const limit = 10;
            const offset = page * limit;
            const assets = await this.animalAssetModel.find({ adminId }).skip(offset).limit(limit).populate('animal').populate('addedBy', '-password').exec();
            if (!assets || assets.length === 0) {
                return ResponseHandler.handleNotFound("No available assets records")
            }
            return ResponseHandler.handleOk(`${assets.length} assets records fetched`, assets);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, while fetching all assets records: " + error);
        }
    }

    async updateAsset(id: string, updateAnimalAssetDto: UpdateAnimalAssetDTO): Promise<ResponseDto> {
        try {
            const asset = await this.animalAssetModel.findByIdAndUpdate(id, updateAnimalAssetDto, { new: true });
            if (!asset) {
                return ResponseHandler.handleNotFound('Asset not found');
            }
            return ResponseHandler.handleOk('Asset updated successfully', asset);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to update asset: " + error);
        }
    }

    async deleteAsset(id: string): Promise<ResponseDto> {
        try {
            const asset = await this.animalAssetModel.findByIdAndDelete(id);
            if (!asset) {
                return ResponseHandler.handleNotFound('Asset not found');
            }
            return ResponseHandler.handleNoContent('Asset deleted successfully');
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to delete asset: " + error);
        }
    }




}