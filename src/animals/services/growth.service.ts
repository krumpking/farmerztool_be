import { Inject, Injectable } from "@nestjs/common";
import { ANIMAL_GROWTH_MODEL, ANIMAL_MODEL } from "../constants/animal.constants";
import { Model } from "mongoose";
import { Animal } from "../interfaces/animal.interface";
import { AnimalGrowth } from "../interfaces/animalGrowth.interface";
import { ResponseDto, ResponseHandler } from "src/common/response.dto";
import { User as UserInterface } from "../animals.service";
import { AnimalGrowthDTO } from "../dto/animalGrowth.dto";
import { UpdateAnimalGrowthDto } from "../dto/update-animalGrowth.dto";


@Injectable()

export class AnimalGrowthService {
    constructor(
        @Inject(ANIMAL_MODEL) private animalModel: Model<Animal>,
        @Inject(ANIMAL_GROWTH_MODEL) private animalGrowthModel: Model<AnimalGrowth>
    ) { }

    async addGrowthRecord(user: UserInterface, animalId: string, createAnimalGrowthDto: AnimalGrowthDTO): Promise<ResponseDto> {
        try {
            const animal = await this.animalModel.findById(animalId);
            if (!animal) {
                return ResponseHandler.handleBadRequest('Animal not found');
            }

            const animalGrowthInstance = await this.animalGrowthModel.create({
                ...createAnimalGrowthDto,
                adminId: user.adminId,
                addedBy: user.id,
                addedByType: user.userType,
                animalId: animal.animalId,
                animal: animalId
            });



            if (!animalGrowthInstance) {
                return ResponseHandler.handleBadRequest('Growth record not created');
            }

            await this.animalModel.findByIdAndUpdate(animal._id, {
                $push: {
                    animalGrowth: animalGrowthInstance._id
                }
            });

            return ResponseHandler.handleCreated('Growth record added', animalGrowthInstance);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError('Something went wrong, while adding growth record: ' + error);
        }
    }

    async getGrowthRecord(id: string): Promise<ResponseDto> {
        try {
            const record = await this.animalGrowthModel.findById(id).populate('animal').populate('addedBy');
            if (!record) {
                return ResponseHandler.handleNotFound("No record found");
            }
            return ResponseHandler.handleOk("Growth record fetched", record)
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError('Something went wrong, while fetching growth record: ' + error);
        }
    }

    async getGrowthRecordsForAnimal(animalId: string, page: number): Promise<ResponseDto> {
        try {
            const limit = 10;
            const offset = page * limit;
            const animal = await this.animalModel.findById(animalId);
            if (!animal) {
                return ResponseHandler.handleNotFound("Animal not found");
            }
            const records = await this.animalGrowthModel.find({ animal: animal._id }).skip(offset).limit(limit).populate('animal').populate('addedBy').exec();
            if (!records || records.length === 0) {
                return ResponseHandler.handleNotFound("No record found");
            }
            return ResponseHandler.handleOk("Growth records fetched", records)
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError('Something went wrong, while fetching growth records: ' + error);
        }
    }

    async getGrowthRecordsForAdmin(adminId: string, page: number): Promise<ResponseDto> {
        try {
            const limit = 10;
            const offset = page * limit;
            const records = await this.animalGrowthModel.find({ adminId }).skip(offset).limit(limit).populate('animal').populate('addedBy').exec();
            if (!records || records.length === 0) {
                return ResponseHandler.handleNotFound("No record found");
            }
            return ResponseHandler.handleOk("Growth records fetched", records)
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError('Something went wrong, while fetching growth records: ' + error);
        }
    }

    async updateGrowthRecord(id: string, updateAnimalGrowthDto: UpdateAnimalGrowthDto): Promise<ResponseDto> {
        try {
            const record = await this.animalGrowthModel.findByIdAndUpdate(id, updateAnimalGrowthDto, { new: true }).populate('animal').populate('addedBy');
            if (!record) {
                return ResponseHandler.handleBadRequest("Failed to update growth record");
            }
            return ResponseHandler.handleOk("Growth record updated", record)
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError('Something went wrong, while updating growth record: ' + error);
        }
    }

    async deleteGrowthRecord(id: string): Promise<ResponseDto> {
        try {
            const record = await this.animalGrowthModel.findByIdAndDelete(id);
            if (!record) {
                return ResponseHandler.handleBadRequest("Failed to delete growth record");
            }
            return ResponseHandler.handleNoContent("Growth record deleted");
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError('Something went wrong, while deleting growth record: ' + error);
        }
    }
}