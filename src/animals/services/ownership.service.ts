import { Inject, Injectable } from "@nestjs/common";
import { AnimalOwnership } from "../interfaces/animalOwnership.interface";
import { Model } from "mongoose";
import { ANIMAL_MODEL, ANIMAL_OWNERSHIP_MODEL } from "../constants/animal.constants";
import { Animal } from "../interfaces/animal.interface";
import { ResponseDto, ResponseHandler } from "src/common/response.dto";
import { User as UserInterface } from "../animals.service";
import { AnimalOwnershipDTO } from "../dto/animalOwnership.dto";
import { UpdateAnimalOwnershipDTO } from "../dto/updateAnimalOwnership.dto";

@Injectable()

export class AnimalOwnershipService {
    constructor(
        @Inject(ANIMAL_OWNERSHIP_MODEL) private animalOwnershipModel: Model<AnimalOwnership>,
        @Inject(ANIMAL_MODEL) private animalModel: Model<Animal>,
    ) { }

    async addOwnership(user: UserInterface, animalId: string, createAnimalOwnershipDto: AnimalOwnershipDTO): Promise<ResponseDto> {
        try {
            const animal = await this.animalModel.findById(animalId);
            if (!animal) {
                return ResponseHandler.handleNotFound("Animal not found");
            }

            const animalOwnershipInstance = await this.animalOwnershipModel.create({
                ...createAnimalOwnershipDto,
                adminId: user.adminId,
                addedBy: user.id,
                animalId: animal.animalId,
                animal: animalId,
                addedByType: user.userType,
            });


            if (!animalOwnershipInstance) {
                return ResponseHandler.handleBadRequest("Animal Ownership not created");
            }

            await this.animalModel.findByIdAndUpdate(animalId, {
                $push: {
                    animalOwnership: animalOwnershipInstance._id
                }
            })

            return ResponseHandler.handleCreated("Onwership record created", animalOwnershipInstance)
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to add animal ownership: " + error);
        }
    }

    async getOwnershipRecord(id: string): Promise<ResponseDto> {
        try {
            const ownershipRecord = await this.animalOwnershipModel.findById(id).populate('animal').populate('addedBy', '-password').exec();
            if (!ownershipRecord) {
                return ResponseHandler.handleNotFound("Ownership record not found");
            }


            return ResponseHandler.handleOk("Ownership record fetched", ownershipRecord);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to get ownership record: " + error);
        }
    }

    async getOwnershipRecordsForAnimal(animalId: string, page: number): Promise<ResponseDto> {
        try {
            const limit = 10;
            const offset = page * limit;
            const animal = await this.animalModel.findById(animalId);
            if (!animal) {
                return ResponseHandler.handleNotFound("Animal not found");
            }
            const records = await this.animalOwnershipModel.find({ animal: animal._id }).skip(offset).limit(limit).populate('animal').populate('addedBy').exec();
            if (!records || records.length === 0) {
                return ResponseHandler.handleNotFound("No record found");
            }
            return ResponseHandler.handleOk("Ownership records fetched", records);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to get ownership records: " + error);
        }
    }

    async getOwnershipRecordsForAdmin(adminId: string, page: number): Promise<ResponseDto> {
        try {
            const limit = 10;
            const offset = page * limit;
            const records = await this.animalOwnershipModel.find({ adminId }).skip(offset).limit(limit).populate('animal').populate('addedBy').exec();
            if (!records || records.length === 0) {
                return ResponseHandler.handleNotFound("No record found");
            }
            return ResponseHandler.handleOk("Ownership records fetched", records);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to get ownership records: " + error);
        }
    }

    async updateOwnershipRecord(id: string, updateAnimalOwnershipDto: UpdateAnimalOwnershipDTO): Promise<ResponseDto> {
        try {
            const ownershipRecord = await this.animalOwnershipModel.findById(id);
            if (!ownershipRecord) {
                return ResponseHandler.handleNotFound("Ownership record not found");
            }
            const updatedOwnershipRecord = await this.animalOwnershipModel.findByIdAndUpdate(id, updateAnimalOwnershipDto, { new: true });
            return ResponseHandler.handleOk("Ownership record updated", updatedOwnershipRecord);
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to update ownership record: " + error);
        }
    }

    async deleteOwnershipRecord(id: string): Promise<ResponseDto> {
        try {
            const ownershipRecord = await this.animalOwnershipModel.findByIdAndDelete(id);
            if (!ownershipRecord) {
                return ResponseHandler.handleNotFound("Ownership record not found");
            }
            return ResponseHandler.handleNoContent("Ownership record deleted");
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong, failed to delete ownership record: " + error);
        }
    }




}