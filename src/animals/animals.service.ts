import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  ANIMAL_MODEL,
  ANIMAL_PRODUCTION_MODEL,
  ANIMAL_REQUEST_MODEL,
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
import { AnimalRequest } from './interfaces/animal-request.interface';
import { CreateAnimalRequestDto } from './dto/animalByEmployeeRequest.dto';
import { UpdateAnimalRequestDto } from './dto/update-animal-request.dto';

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
    private productionModel: Model<Production>,
    @Inject(ANIMAL_REQUEST_MODEL) 
    private animalRequestModel: Model<AnimalRequest>
  ) { }


  ////////////////////////// ANIMALS //////////////////////////////////////////////
  async addAnimal(adminId: string, createAnimalDto: CreateAnimalDto): Promise<ResponseDto> {
    try {
      //check if animal exist

      const animalExists = await this.animalModel.findOne({ animalId: createAnimalDto.animalId });


      if (animalExists) {
        return ResponseDto.errorResponse("Animal already exists");
      }
      const newAnimalInstance = await this.animalModel.create({
        ...createAnimalDto,
        adminId: adminId
      });

      const createdAnimal = await this.animalModel.findById(newAnimalInstance._id);

      if (!createdAnimal) {
        return ResponseDto.errorResponse("Failed to create animal record");
      }

      return ResponseDto.successResponse("Animal record created successfully", createdAnimal);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Somethinng went wrong. Failed to create animal record");
    }
  }

  async getAnimal(Id: string): Promise<ResponseDto> {
    try {
      //check if annimal exist
      const animalExists = await this.animalModel.findById(Id)

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
      // 
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

  async updateAnimal(Id: string, updateAnimalDto: UpdateAnimalDto): Promise<ResponseDto> {
    try {
      const animalExist = await this.animalModel.findByIdAndUpdate(Id, updateAnimalDto, { new: true }).exec();

      if (!animalExist) {
        throw new HttpException("Animal not found", 404);
      }

      return ResponseDto.successResponse("Animal updated successfully", animalExist);
    } catch (error) {
      console.log(error);
      
      return ResponseDto.errorResponse('Something went wrong updating animal')
    }
  }

  async deleteAnimal(Id: string): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findByIdAndDelete(Id);
      if (!animal) {
        return ResponseDto.errorResponse("Failed to delete animal");
      }
      return ResponseDto.successResponse("Animal deteted successfully", "")
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong deleting animal")
    }
  }



  ////////////////////////////////////// BREEDING //////////////////////////////////////////////

  async addBreedingInfo(adminId: string, breedingInfo: CreateBreedingDto): Promise<ResponseDto> {
    try {
      if (breedingInfo.animalId === null) {
        return ResponseDto.errorResponse("null animal id")
      }
      const animalExist = await this.animalModel.findOne({
        animalId: breedingInfo.animalId, 
        adminId: adminId
      });
      if (!animalExist) {
        return ResponseDto.errorResponse("Animal does not exist");
      }

      const existingBreedingInfo = await this.breedingModel.findOne({
        ...breedingInfo,
        adminId: adminId
      });

      if (existingBreedingInfo) {
        return ResponseDto.errorResponse("Breeding information already exist please navigate to the breeding update")
      }

      const breedingInstance = await this.breedingModel.create({
        ...breedingInfo,
        adminId: adminId
      })

      const createdBreed = await this.breedingModel.findById(breedingInstance._id)

      if (!createdBreed) {
        return ResponseDto.errorResponse("Failed to add breed")
      }

      return ResponseDto.successResponse("Breed created", createdBreed);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to add breeding")
    }
  }

  async getAnimalBreedingInfo(adminId: string, animalId: string): Promise<ResponseDto> {
    try {
      // check animal brreding info
      const breeding = await this.breedingModel.find({
        animalId: animalId,
        adminId: adminId
      });

      if (!breeding || breeding.length === 0) {
        return ResponseDto.errorResponse("Breeding information not found");
      }

      return ResponseDto.successResponse("Breeding information fetched", breeding)
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

  async updateBreedingInfo(animalId: string, breedingInfo: UpdateBreedingDto): Promise<ResponseDto> {
    try {
      const updateInfo = {...breedingInfo};
      delete updateInfo.animalId;
      const updatedBreeding = await this.breedingModel.findByIdAndUpdate(animalId, updateInfo, {new: true}).exec();
      if (!updatedBreeding) {
        return ResponseDto.errorResponse("Breeding information not found");
      }
      return ResponseDto.successResponse("Breeding information updated", updatedBreeding);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to update breeding information");
    }
  }

  async deleteBreedingInfo(animalId: string): Promise<ResponseDto> {
    try {
      const existingBreedingInfo = await this.breedingModel.findByIdAndDelete(animalId);
      if (!existingBreedingInfo) {
        return ResponseDto.errorResponse("Breeding information not found");
      }
      return ResponseDto.successResponse("Breeding information deleted", null);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to delete breeding information");
    }
  }


  ////////////////////////////////////FEEDING////////////////////////////////////////////////////////////

  async addFeed(adminId: string, feedInfo: CreateFeedDto): Promise<ResponseDto> {
    try {
      // check feed is exist
      const feedExists = await this.feedingModel.findOne({
        ...feedInfo,
        adminId
      });

      if (feedExists) {
        return ResponseDto.errorResponse("Feed already exist")
      }

      const feedingInstance = await this.feedingModel.create({
        ...feedInfo,
        adminId
      })

      const createdFeed = await this.feedingModel.findById(feedingInstance._id);

      if (!createdFeed) {
        return ResponseDto.errorResponse("Failed to create feed")
      }
      return ResponseDto.successResponse("Feed created", createdFeed);

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

  async getAnimalFeedingInfo(animalId: string, adminId: string): Promise<ResponseDto> {
    try {
      const feed = await this.feedingModel.find({ animalId, adminId });
      if (!feed || feed.length === 0) {
        return ResponseDto.errorResponse("No feeds found")
      }
      return ResponseDto.successResponse("Feeds fetched", feed);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to fetch feeds")
    }
  }

  async getAllAnimalFeedingInfo(adminId: string): Promise<any> {
    try {

      const animalExists = await this.feedingModel.find({ adminId });

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
      const updateFeed = await this.feedingModel.findByIdAndUpdate(id, updateFeedDto, { new: true });
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
      return ResponseDto.successResponse("Feed deleted successfully", null);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to delete feed");
    }
  }


  ////////////////////VACINATION/////////////////////////////////////////////////////////

  async addVaccination(adminId: string, createVaccinationDto: CreateVaccinationDto): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findOne({ animalId: createVaccinationDto.animalId });
      if (!animal) {
        return ResponseDto.errorResponse("Animal not found");
      }

      const existingVaccine = await this.vaccinationModel.findOne({
        ...createVaccinationDto,
        adminId
      })
      if (existingVaccine) {
        return ResponseDto.errorResponse("Vaccine already exist");
      }
      const vaccination = await this.vaccinationModel.create({
        ...createVaccinationDto,
        adminId
      });

      const createdVaccine = await this.vaccinationModel.findById(vaccination._id);

      if (!createdVaccine) {
        return ResponseDto.errorResponse("Failed to create vaccine");
      }


      return ResponseDto.successResponse("Vaccine created", createdVaccine);


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

  async getAllVaccinesPerAnimal(animalId: string, adminId: string): Promise<ResponseDto> {
    try {
      const vaccines = await this.vaccinationModel.find({ animalId, adminId });
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
      return ResponseDto.successResponse("Vaccine updated", updatedVaccine);
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
      return ResponseDto.successResponse("Vaccine deleted", "");
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to delete vaccine");
    }
  }

  ///////////////////////PRODUCTION///////////////////////////////////////

  async addProduction(adminId: string, createProductionDto: CreateProductionDto): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findOne({ animalId: createProductionDto.animalId, adminId });
      if (!animal) {
        return ResponseDto.errorResponse("Animal not found");
      }

      const existingProduction = await this.productionModel.findOne({
        ...createProductionDto,
        adminId,
        meatProduction: { $exists: true },
        milkProduction: { $exists: true },
        woolFurProduction: { $exists: true },
        salesRecords: { $exists: true, $ne: [] }
      })
      if (existingProduction) {
        return ResponseDto.errorResponse("Production already exist");
      }


      const productionInstance = await this.productionModel.create({
        ...createProductionDto,
        adminId
      });

      const createdProduction = await this.productionModel.findById(productionInstance._id)

      if (!createdProduction) {
        return ResponseDto.errorResponse("Failed to add animal production");
      }

      return ResponseDto.successResponse("Production added", createdProduction);
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

  async getAllProductionsPerAnimal(animalId: string, adminId: string): Promise<ResponseDto> {
    try {
      const productions = await this.productionModel.find({ animalId , adminId});

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
      const updatedProduction = await this.productionModel.findByIdAndUpdate(Id, updateProductionDto,
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


  //////////////////////////////ANIMAL REQUEST //////////////////////////////////////

  async addAnimalRequest(adminId: string, createAnimalRequestDto: CreateAnimalRequestDto): Promise<ResponseDto> {
    try {
      const existingRequest = await this.animalRequestModel.findOne({
        ...createAnimalRequestDto
      })

      if (existingRequest) {
        return ResponseDto.errorResponse("Request already exist");
      }

      const animalRequestInstance = await this.animalRequestModel.create({
        ...createAnimalRequestDto,
        adminId
      });

      const createdRequest = await this.animalRequestModel.findById(animalRequestInstance._id)

      if (!createdRequest) {
        return ResponseDto.errorResponse("Failed to add animal request");
      }

      return ResponseDto.successResponse("Request added", createdRequest);


    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to add animal request");
    }
  }

  async getAllAnimalRequests(adminId: string): Promise<ResponseDto> {
    try {
      const requests = await this.animalRequestModel.find({ adminId });

      if (!requests || requests.length === 0) {
        return ResponseDto.errorResponse("No available requests");
      }
      return ResponseDto.successResponse("Requests fetched", requests);
     } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch requests");
    }
  }

  async rejectAnimalRequest(id: string): Promise<ResponseDto>{
    try{
      const request = await this.animalRequestModel.findByIdAndUpdate(id, {$set: {status: 'rejected'}}, {new: true});
      if (!request) {
        return ResponseDto.errorResponse("Failed to reject request");
      }
      return ResponseDto.successResponse("Request rejected", request);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to reject request");
    }
  }

  async approveAnimalRequest(id: string): Promise<ResponseDto>{
    try{
      const request = await this.animalRequestModel.findByIdAndUpdate(id, {$set: {status: 'approved'}}, {new: true});
      if (!request) {
        return ResponseDto.errorResponse("Failed to approve request");
      }
      return ResponseDto.successResponse("Request approved", request);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to approve request");
    }
  }

  async getRejectedAnimalRequest(adminId: string): Promise<ResponseDto>{
    try{
      const request = await this.animalRequestModel.find({adminId, status: 'rejected'});
      if (!request || request.length === 0) {
        return ResponseDto.errorResponse("No available requests");
      }
      return ResponseDto.successResponse("Request fetched", request);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch request");
    }
  }

  async getApprovedAnimalRequest(adminId: string): Promise<ResponseDto>{
    try{
      const request = await this.animalRequestModel.find({adminId, status: 'approved'});
      if (!request || request.length === 0) {
        return ResponseDto.errorResponse("No available request");
      }
      return ResponseDto.successResponse("Request fetched", request);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch request");
    }
  }

  async getPendingAnimalRequest(adminId: string): Promise<ResponseDto>{
    try{
      
      const request = await this.animalRequestModel.find({adminId, status: "pending"});
      if (!request || request.length === 0) {
        return ResponseDto.errorResponse("No available request");
      }
      return ResponseDto.successResponse("Request fetched", request);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch request");
    }
  }

  async getSpecificAnimalRequest(Id: string): Promise<ResponseDto> {
    try {
      const request = await this.animalRequestModel.findById(Id);
      if (!request) {
        return ResponseDto.errorResponse("Failed to fetch request");
      }
      return ResponseDto.successResponse("Request fetched", request);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to fetch request");
    }
  }

  async addApprovedAnimalToFarmAnimals(id: string): Promise<ResponseDto>{
    try{
      const approvedAnimal = await this.animalRequestModel.findOne({
        _id: id,
        status: 'approved'
      });
      if (!approvedAnimal) {
        return ResponseDto.errorResponse("Failed to fetch request");
      }

      console.log(approvedAnimal);
      

      const animal = await this.animalModel.create({
        animalId: approvedAnimal.animalId,
        addedBy: approvedAnimal.addedBy,
        animaltype: approvedAnimal.animaltype,
        attr: approvedAnimal.attr,
        adminId: approvedAnimal.adminId

      });

      const createdAnimal = await this.animalModel.findById(animal._id);
      if (!createdAnimal) {
        return ResponseDto.errorResponse("Failed to add animal to farm animals");
      }
      return ResponseDto.successResponse("Animal added to farm animals", createdAnimal);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to add animal to farm animals");
    }
  }

  async updateAnimalRequest(Id: string, updateAnimalRequestDto: UpdateAnimalRequestDto): Promise<ResponseDto> {
    try {
      const updatedRequest = await this.animalRequestModel.findByIdAndUpdate(Id, updateAnimalRequestDto,
        { new: true });

      if (!updatedRequest) {
        return ResponseDto.errorResponse("Failed to update request");
      }
      return ResponseDto.successResponse("Request updated", updatedRequest);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to update request");
    }
  }

  async deleteAnimalRequest(Id: string): Promise<ResponseDto> {
    try {
      const deletedRequest = await this.animalRequestModel.findByIdAndDelete(Id);
      if (!deletedRequest) {
        return ResponseDto.errorResponse("Failed to delete request");
      }
      return ResponseDto.successResponse("Request deleted", null);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, failed to delete request");
    }
  }
  



}
