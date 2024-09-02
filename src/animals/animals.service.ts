import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  ANIMAL_MODEL,
  ANIMAL_PRODUCTION_MODEL,
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
import { UpdateFeedDto } from './dto/updateFeed.dto';
import { UpdateVaccinationDto } from './dto/updateVaccination.dto';
import { Production } from './interfaces/production.interface';
import { CreateProductionDto } from './dto/production.dto';
import { UpdateProductionDto } from './dto/updateProduction.dto';

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
    private userModel: Model<UserDto>,
    @Inject(ANIMAL_PRODUCTION_MODEL)
    private productionModel: Model<Production>
  ) { }


  ////////////////////////// ANIMALS //////////////////////////////////////////////
  async addAnimal(createAnimalDto: CreateAnimalDto): Promise<ResponseDto> {
    try {
      //check if animal exist

      const animalExists = await this.animalModel.findOne({ animalId: createAnimalDto.animalId });


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

      if (!animalExists) {
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

      if (!animalExists || animalExists.length <= 0) {
        return ResponseDto.errorResponse("Failed to fetch animals");
      }

      return ResponseDto.successResponse("Animals fetched successfully", animalExists);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to fetch animal");
    }
  }

  async updateAnimal(animalId: string, updateAnimalDto: UpdateAnimalDto): Promise<ResponseDto> {
    try {
      const animalExist = await this.animalModel.findOneAndUpdate({ animalId }, updateAnimalDto, { new: true }).exec();

      if (!animalExist) {
        throw new HttpException("Animal not found", 404);
      }

      return ResponseDto.successResponse("Animal updated successfully", animalExist);
    } catch (error) {
      return ResponseDto.errorResponse('Something went wrong updating animal')
    }
  }

  async deleteAnimal(animalId: string): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findOneAndDelete({ animalId });
      if (!animal) {
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
      if (breedingInfo.animalId === null) {
        return ResponseDto.errorResponse("null animal id")
      }
      const animalExist = await this.animalModel.findOne({ animalId: breedingInfo.animalId });
      if (!animalExist) {
        return ResponseDto.errorResponse("Animal does not exist");
      }

      const existingBreedingInfo = await this.breedingModel.findOne({ animalId: breedingInfo.animalId });

      if (existingBreedingInfo) {
        return ResponseDto.errorResponse("Breeding information already exist please navigate to the breeding update")
      }

      const breedingInstance = new this.breedingModel(breedingInfo);

      if (!breedingInstance) {
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

      if (!animalExists) {
        return ResponseDto.errorResponse("Breeding information not found");
      }

      return ResponseDto.successResponse("Breeding information fetched", animalExists)
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Breeding information not found");
    }
  }

  async getAllBreedingInfo(adminId: string): Promise<ResponseDto> {
    try {
      const allBreedingInfo = await this.breedingModel.find({ adminId }).exec();
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
      const existingBreedingInfo = await this.breedingModel.findOneAndUpdate({ animalId: breedingInfo.animalId }, breedingInfo, { new: true }).exec();
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


  ////////////////////////////////////FEEDING////////////////////////////////////////////////////////////

  async addFeed(feedInfo: CreateFeedDto): Promise<ResponseDto> {
    try {
      // check feed is exist
      const feedingInstance = new this.feedingModel(feedInfo);

      if (!feedingInstance) {
        return ResponseDto.errorResponse("Failed to create feed");
      }

      const feed = await feedingInstance.save();

      return ResponseDto.successResponse("Feed added successfully", feed);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to create feed")
    }
  }

  async getFeedingInfo(id: string): Promise<ResponseDto> {
    try {
      const feed = await this.feedingModel.findById(id);
      if (!feed) {
        return ResponseDto.errorResponse("Failed to fetch feed")
      }

      return ResponseDto.successResponse("Feed fetched", feed);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to fetch feed")
    }
  }

  async getAllAnimalFeedingInfo(adminId: string): Promise<any> {
    try {

      const animalExists = await this.feedingModel.find({adminId});

      if (!animalExists || animalExists.length === 0) {
        return ResponseDto.errorResponse("No feeding found")
      }

      return ResponseDto.successResponse("Feeding fetched", animalExists);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to fetch feeds")
    }
  }

  async updateFeed(id: string, updateFeedDto: UpdateFeedDto): Promise<ResponseDto> {
    try {
      const updateFeed = await this.feedingModel.findByIdAndUpdate(id, {
        adminId: updateFeedDto.adminId,
        addedBy: updateFeedDto.addedBy,
        animalId: updateFeedDto.animalId,
        description: updateFeedDto.description,
        feedType: updateFeedDto.feedType,
        source: updateFeedDto.source,
        nutritionalValue: updateFeedDto.nutritionalValue,
        $push: { barcode: updateFeedDto.barcode }
      }, {new: true});
      if (!updateFeed) {
        return ResponseDto.errorResponse("Failed to update feed")
      }
      return ResponseDto.successResponse("Feed Updated", updateFeed);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to update feed")
    }
  }

  async deleteFeed(id: string): Promise<ResponseDto> {
    try {
      const feed = await this.feedingModel.findByIdAndDelete(id);
      if (!feed) {
        return ResponseDto.errorResponse("Feed not found");
      }
      return ResponseDto.successResponse("Feed deleted successfully", "");
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to delete feed");
    }
  }


  ////////////////////VACINATION/////////////////////////////////////////////////////////

  async addVaccination(createVaccinationDto: CreateVaccinationDto): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findOne({ animalId: createVaccinationDto.animalId });
      if (!animal) {
        return ResponseDto.errorResponse("Animal not found");
      }
      const vaccineInstance = new this.vaccinationModel(createVaccinationDto);
      if (!vaccineInstance) {
        return ResponseDto.errorResponse("Failed to add vaccine");
      }
      const vaccine = await vaccineInstance.save();
      return ResponseDto.successResponse("Vaccine added", vaccine);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to add vaccine");
    }
  }

  async getAllVaccinesInFarm(adminId: string): Promise<ResponseDto> {
    try {
      const vaccines = await this.vaccinationModel.find({ adminId }).exec();
      if (!vaccines || vaccines.length === 0) {
        return ResponseDto.errorResponse("No available vaccine");
      }
      return ResponseDto.successResponse("Vaccines fetched", vaccines);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch vaccines");
    }
  }

  async getAllVaccinesPerAnimal(animalId: string): Promise<ResponseDto> {
    try {
      const vaccines = await this.vaccinationModel.find({ animalId });
      if (!vaccines || vaccines.length === 0) {
        return ResponseDto.errorResponse("No available vaccine");
      }
      return ResponseDto.successResponse("Vaccines fetched", vaccines);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch vaccines");
    }
  }

  async getSpecificVaccine(Id: string): Promise<ResponseDto> {
    try {
      const vaccine = await this.vaccinationModel.findById(Id);
      if (!vaccine) {
        return ResponseDto.errorResponse("Failed to fetch vaccine");
      }
      return ResponseDto.successResponse("Vaccine fetched", vaccine);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch vaccine");
    }
  }

  async updateVaccine(Id: string, updateVaccinationDto: UpdateVaccinationDto): Promise<ResponseDto> {
    try {
      const updatedVaccine = await this.vaccinationModel.findByIdAndUpdate(
        Id,
        updateVaccinationDto,
        { new: true }
      );

      if (!updatedVaccine) {
        return ResponseDto.errorResponse("Failed to update vaccine");
      }
      return ResponseDto.successResponse("Vaccine fetched", updatedVaccine);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to update vaccine");
    }
  }

  async deleteVaccine(Id: string): Promise<ResponseDto> {
    try {
      const deletedVaccine = await this.vaccinationModel.findByIdAndDelete(Id);
      if (!deletedVaccine) {
        return ResponseDto.errorResponse("Failed to delete vaccine");
      }
      return ResponseDto.successResponse("Vaccine fetched", "");
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to delete vaccine");
    }
  }

  ///////////////////////PRODUCTION///////////////////////////////////////

  async addProduction(createProductionDto: CreateProductionDto): Promise<ResponseDto>{
    try {
      const animal = await this.animalModel.findOne({animalId: createProductionDto.animalId});
      if(!animal){
        return ResponseDto.errorResponse("Animal not found");
      }

      const productionInstance = new this.productionModel(createProductionDto);

      if(!productionInstance){
        return ResponseDto.errorResponse("Failed to add animal production");
      }

      const production = await productionInstance.save();
      return ResponseDto.successResponse("Production added", production);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to add animal production");
    }
  }

  async getAllProductionsInFarm(adminId: string): Promise<ResponseDto> {
    try {
      const productions = await this.productionModel.find({ adminId });
      
      if (!productions || productions.length === 0) {
        return ResponseDto.errorResponse("No available productions");
      }
      return ResponseDto.successResponse("Productions fetched", productions);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch productions");
    }
  }

  async getAllProductionsPerAnimal(animalId: string): Promise<ResponseDto> {
    try {
      const productions = await this.productionModel.find({ animalId });
      
      if (!productions || productions.length === 0) {
        return ResponseDto.errorResponse("No available productions");
      }
      return ResponseDto.successResponse("Productions fetched", productions);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch productions");
    }
  }

  async getSpecificProduction(Id: string): Promise<ResponseDto> {
    try {
      const production = await this.productionModel.findById(Id);
      if (!production) {
        return ResponseDto.errorResponse("Failed to fetch production");
      }
      return ResponseDto.successResponse("Production fetched", production);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch production");
    }
  }

  async updateProduction(Id: string, updateProductionDto: UpdateProductionDto): Promise<ResponseDto> {
    try {
      const updatedProduction = await this.productionModel.findByIdAndUpdate(Id ,updateProductionDto,
        { new: true });
       

      if (!updatedProduction) {
        return ResponseDto.errorResponse("Failed to update production");
      }
      return ResponseDto.successResponse("Production updated", updatedProduction);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to update production");
    }
  }

  async deleteProduction(Id: string): Promise<ResponseDto> {
    try {
      const deletedProduction = await this.productionModel.findByIdAndDelete(Id);
      if (!deletedProduction) {
        return ResponseDto.errorResponse("Failed to delete production");
      }
      return ResponseDto.successResponse("Production deleted", "");
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to delete production");
    }
  }
 

}
