import { Inject, Injectable } from "@nestjs/common";
import { ANIMAL_HEALTH_MODEL, ANIMAL_MODEL } from "../constants/animal.constants";
import { Model } from "mongoose";
import { AnimalHealth } from "../interfaces/animalHealth.interface";
import { Animal } from "../interfaces/animal.interface";
import { CreateAnimalHealthDto } from "../dto/animalHealthRecords.dto";
import { ResponseDto, ResponseHandler } from "src/common/response.dto";
import { UpdateAnimalHealthDto } from "../dto/update-AnimalHealth.dto";


interface User {
    id: string;
    userType: string;
    adminId: string;
}

@Injectable()
export class AnimalHealthService {
    constructor(
        @Inject(ANIMAL_HEALTH_MODEL) private animalHealthModel: Model<AnimalHealth>,
        @Inject(ANIMAL_MODEL) private animaModel: Model<Animal>
    ) { }

    async addHealthRecord(user: User, animalId: string, createAnimalHealthDto: CreateAnimalHealthDto): Promise<ResponseDto> {
        try {
            const animal = await this.animaModel.findById(animalId);

            if (!animal) {
                return ResponseHandler.handleNotFound('Animal not found')
            }

            const animalHealthInstance = await this.animalHealthModel.create({
                ...createAnimalHealthDto,
                adminId: user.adminId,
                addedBy: user.id,
                addedByType: user.userType,
                animal: animalId
            });

            if (!animalHealthInstance) {
                return ResponseHandler.handleBadRequest("Failed to add animal health record");
            }

            await this.animaModel.findByIdAndUpdate(animal._id, {
                $push: {
                    animalHealth: animalHealthInstance._id
                }
            }, { new: true }).exec();

            return ResponseHandler.handleCreated("Animal health record added", animalHealthInstance);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to add health record: " + error);
        }
    }

    async getHealthRecord(id: string): Promise<ResponseDto> {
        try {
            const healthRecord = await this.animalHealthModel.findById(id).populate('animal').populate('addedBy').exec();

            if (!healthRecord) {
                return ResponseHandler.handleNotFound("Health record not found");
            }

            return ResponseHandler.handleOk("Health record fetched", healthRecord);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to get health record: " + error);
        }
    }

    async getAllHealthRecordsForAnimal(animalId: string, page: number): Promise<ResponseDto> {
        try {
            const animal = await this.animaModel.findById(animalId);

            if (!animal) {
                return ResponseHandler.handleNotFound("Animal not found");
            }

            const healthRecords = await this.animalHealthModel.find({ animal: animalId })
                .populate('addedBy')
                .populate('animal')
                .sort({ createdAt: -1 })
                .skip(page * 10)
                .limit(10);

            if (!healthRecords) {
                return ResponseHandler.handleNotFound("No available records")
            }

            return ResponseHandler.handleOk('Health records fetched', healthRecords)
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, while fetching animal health records: " + error)
        }
    }

    async getAllHealthRecordsForAdmin(adminId: string, page: number): Promise<ResponseDto> {
        try {

            const healthRecords = await this.animalHealthModel.find({ adminId: adminId })
                .populate('addedBy')
                .populate('animal')
                .sort({ createdAt: -1 })
                .skip(page * 10)
                .limit(10);

            if (!healthRecords) {
                return ResponseHandler.handleNotFound("No available records")
            }

            return ResponseHandler.handleOk('Health records fetched', healthRecords)
        } catch (error) {
            return ResponseHandler.handleInternalServerError("Something went wrong, while fetching animal health records: " + error)
        }
    }

    async updateHealthRecord(id: string, updateHealthRecordDto: UpdateAnimalHealthDto): Promise<ResponseDto> {
        try {
            const update = await this.animalHealthModel.findByIdAndUpdate(id, {
                ...updateHealthRecordDto
            }, { new: true }).exec();

            if (!update) {
                return ResponseHandler.handleBadRequest("Failed to update record")
            }
            return ResponseHandler.handleOk("Record updated", update)
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, while updating record: " + error)
        }
    }
    async deleteHealthRecord(id: string): Promise<ResponseDto> {
        try {
            const deletedRecord = await this.animalHealthModel.findByIdAndDelete(id).exec();

            if (!deletedRecord) {
                return ResponseHandler.handleBadRequest("Failed to delete record")
            }

            return ResponseHandler.handleNoContent("Record deleted")
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, while deleting record: " + error)
        }
    }



}