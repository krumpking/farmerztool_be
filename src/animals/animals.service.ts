import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  ANIMAL_MODEL,
  BREEDING_MODEL,
  FEED_MODEL,
  VACCINATION_MODEL
} from './constants/animal.constants';
import { Model } from 'mongoose';
import { CreateVaccinationDto } from './dto/vaccination.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Animal } from './interfaces/animal.interface';
import { BreedingInfo } from './interfaces/breeding.info.inferface';
import { CreateBreedingDto } from './dto/breeding.dto';
import { CreateFeedDto } from './dto/feed.dto';
import { Feed } from './interfaces/feed.interface';
import { Vaccination } from './interfaces/vaccination.interface';
import { ResponseDto } from 'src/common/response.dto';
import { USER_MODEL } from 'src/auth/constants/auth.constants';
import { UserDto } from 'src/auth/dto/user.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @Inject(ANIMAL_MODEL)
    private animalModel: Model<Animal>,
    @Inject(BREEDING_MODEL)
    private breedingModel: Model<BreedingInfo>,
    @Inject(FEED_MODEL)
    private feedingModel: Model<Feed>,
    @Inject(VACCINATION_MODEL)
    private vaccinationModel: Model<Vaccination>,
    @Inject(USER_MODEL)
    private userModel: Model<UserDto>
  ) { }


  ////////////////////////// ANIMALS //////////////////////////////////////////////
  async addAnimal(createAnimalDto: CreateAnimalDto): Promise<ResponseDto> {
    try {
      //check if animal exist

      const animalExists = await this.animalModel.findOne({animalId: createAnimalDto.animalId});
      

      if (animalExists) {
        return ResponseDto.errorResponse("Animal already exists");
      }
      const newAnimalInstance = new this.animalModel(createAnimalDto);

      if (!newAnimalInstance) {
        return ResponseDto.errorResponse("Failed to create animal record");
      };


      const createdAnimal = await newAnimalInstance.save();

      return ResponseDto.successResponse("Animal record created successfully", createdAnimal);
  
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Somethinng went wrong. Failed to create animal record");
    }
  }

  async getAnimal(animalId: string): Promise<ResponseDto> {
    try {
      //check if annimal exist
      const animalExists = await this.animalModel.findOne({
        animalId: animalId,
      });

      if(!animalExists){
          return ResponseDto.errorResponse("Failed to fetch animal");
        }
        
        return ResponseDto.successResponse("Animal found", animalExists);
      } catch (error) {
        return ResponseDto.errorResponse("Something went wrong while fetching the animal");
    }
  }

  async getAllMyAnimals(adminId: string): Promise<ResponseDto> {
    try {
      // Check if email is already taken before adding user
      const animalExists = await this.animalModel.find({
        adminId: adminId,
      });

      if(!animalExists || animalExists.length <= 0){
        return ResponseDto.errorResponse("Failed to fetch animals");
      }

      return ResponseDto.successResponse("Animals fetched successfully", animalExists);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to fetch animal");
    }
  }

  async updateAnimal(animalId: string, updateAnimalDto: UpdateAnimalDto): Promise<ResponseDto>{
    try {
      const animalExist = await this.animalModel.findOneAndUpdate({animalId}, updateAnimalDto, {new: true}).exec();

      if(!animalExist){
        throw new HttpException("Animal not found", 404);
      }

      return ResponseDto.successResponse("Animal updated successfully", animalExist);
    } catch (error) {
      return ResponseDto.errorResponse('Something went wrong updating animal')
    }
  }

  async deleteAnimal(animalId: string): Promise<ResponseDto>{
    try {
      const animal = await this.animalModel.findOneAndDelete({animalId});
      if(!animal){
        return ResponseDto.errorResponse("Failed to delete animal");
      }
      return ResponseDto.successResponse("Animal deteted successfully", "")
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong deleting animal")
    }
  }



  ////////////////////////////////////// BREEDING //////////////////////////////////////////////

  async addBreedingInfo(breedingInfo: CreateBreedingDto): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const breedingInfoExists = await this.breedingModel.find({
        animalId: breedingInfo.animalId,
      });

      // If email exists, return email already exists message and success false, else create user
      if (breedingInfoExists.length > 0) {
        return this.animalModel.findOneAndUpdate(
          { adminId: breedingInfo.adminId },
          breedingInfo,
          { new: true },
        );
      }
      const addedBreedingInfo = new this.breedingModel(breedingInfo);

      const newBreedingInfo = await addedBreedingInfo.save();
      return newBreedingInfo;
    } catch (error) {
      return null;
    }
  }

  async getAnimalBreedingInfo(animalId: string): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const animalExists = await this.breedingModel.find({
        animalId: animalId,
      });

      return animalExists;
    } catch (error) {
      return null;
    }
  }

  async getAllBreedingInfo(adminId: string): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const animalExists = await this.breedingModel.find({
        adminId: adminId,
      });

      return animalExists;
    } catch (error) {
      return null;
    }
  }

  async addFeed(feedInfo: CreateFeedDto): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const feed = new this.feedingModel(feedInfo);

      const newBreedingInfo = await feed.save();
      return newBreedingInfo;
    } catch (error) {
      return null;
    }
  }

  async getAnimalFeedingInfo(animalId: string): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const animalExists = await this.feedingModel.find({
        animalId: animalId,
      });

      return animalExists;
    } catch (error) {
      return null;
    }
  }

  async addVaccination(vaccinationInfo: CreateVaccinationDto): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const vaccine = new this.vaccinationModel(vaccinationInfo);

      const newVaccinationInfo = await vaccine.save();
      return newVaccinationInfo;
    } catch (error) {
      return null;
    }
  }
}
