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
import { UpdateBreedingDto } from './dto/updateBreeding.dto';

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

  async addBreedingInfo(breedingInfo: CreateBreedingDto): Promise<ResponseDto> {
    try {
      if(breedingInfo.animalId === null){
        return ResponseDto.errorResponse("null animal id")
      }
      const animalExist = await this.animalModel.findOne({animalId: breedingInfo.animalId}); 
      if(!animalExist){
        return ResponseDto.errorResponse("Animal does not exist");
      }

      const existingBreedingInfo = await this.breedingModel.findOne({animalId: breedingInfo.animalId});

      if(existingBreedingInfo){
        return ResponseDto.errorResponse("Breeding information already exist please navigate to the breeding update")
      }

      const breedingInstance = new this.breedingModel(breedingInfo);

      if(!breedingInstance){
        return ResponseDto.errorResponse("Failed to add breeding")
      }

      const createdBreed = await breedingInstance.save();

      return ResponseDto.successResponse("Breed created", createdBreed);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to add breeding")
    }
  }

  async getAnimalBreedingInfo(animalId: string): Promise<ResponseDto> {
    try {
      // check animal brreding info
      const animalExists = await this.breedingModel.findOne({
        animalId: animalId,
      });

      if(!animalExists){
        return ResponseDto.errorResponse("Breeding information not found");
      }

      return ResponseDto.successResponse("Breeding information fetched", animalExists)
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Breeding information not found");
    }
  }

  async getAllBreedingInfo(adminId: string): Promise<ResponseDto> {
    try {
      const allBreedingInfo = await this.breedingModel.find({adminId}).exec();
      if (!allBreedingInfo || allBreedingInfo.length === 0) {
        return ResponseDto.errorResponse("No breeding information found");
      }
      return ResponseDto.successResponse("All breeding information fetched", allBreedingInfo);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to fetch all breeding information");
    }
  }
  
  async updateBreedingInfo(breedingInfo: UpdateBreedingDto): Promise<ResponseDto> {
    try {
      if (breedingInfo.animalId === null) {
        return ResponseDto.errorResponse("null animal id");
      }
      const existingBreedingInfo = await this.breedingModel.findOneAndUpdate({ animalId: breedingInfo.animalId }, breedingInfo, {new: true}).exec();
      if (!existingBreedingInfo) {
        return ResponseDto.errorResponse("Breeding information not found");
      }
      return ResponseDto.successResponse("Breeding information updated", existingBreedingInfo);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to update breeding information");
    }
  }
  
  async deleteBreedingInfo(animalId: string): Promise<ResponseDto> {
    try {
      const existingBreedingInfo = await this.breedingModel.findOneAndDelete({ animalId: animalId });
      if (!existingBreedingInfo) {
        return ResponseDto.errorResponse("Breeding information not found");
      }
      return ResponseDto.successResponse("Breeding information deleted", " ");
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to delete breeding information");
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
