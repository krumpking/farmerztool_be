import {Inject, Injectable } from '@nestjs/common';
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
import { ResponseDto, ResponseHandler } from 'src/common/response.dto';
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
import { LocationDTO } from './dto/animal-location.dto';

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
        return ResponseHandler.handleBadRequest("Animal already exists");
      }
      const newAnimalInstance = await this.animalModel.create({
        ...createAnimalDto,
        adminId: adminId
      });

      const createdAnimal = await this.animalModel.findById(newAnimalInstance._id);

      if (!createdAnimal) {
        return ResponseHandler.handleBadRequest("Failed to create animal record");
      }

      return ResponseHandler.handleCreated("Animal record created successfully", createdAnimal);

    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Somethinng went wrong. Failed to create animal record");
    }
  }

  async getAnimal(Id: string): Promise<ResponseDto> {
    try {
      //check if annimal exist
      const animalExists = await this.animalModel.findById(Id)

      if (!animalExists) {
        return ResponseHandler.handleBadRequest("Failed to fetch animal");
      }

      return ResponseHandler.handleOk("Animal found", animalExists);
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching the animal");
    }
  }

  async getAllMyAnimals(adminId: string): Promise<ResponseDto> {
    try {
      // 
      const animalExists = await this.animalModel.find({
        adminId: adminId,
      });

      if (!animalExists || animalExists.length <= 0) {
        return ResponseHandler.handleBadRequest("Failed to fetch animals");
      }

      return ResponseHandler.handleOk("Animals fetched successfully", animalExists);
    } catch (error) {
      return ResponseDto.errorResponse("Something went wrong. Failed to fetch animal");
    }
  }

  async updateAnimal(Id: string, updateAnimalDto: UpdateAnimalDto): Promise<ResponseDto> {
    try {
      const animalExist = await this.animalModel.findByIdAndUpdate(Id, updateAnimalDto, { new: true }).exec();

      if (!animalExist) {
        return ResponseHandler.handleBadRequest("Animal not found");
      }

      return ResponseHandler.handleOk("Animal updated successfully", animalExist);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError('Something went wrong updating animal')
    }
  }

  async deleteAnimal(Id: string): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findByIdAndDelete(Id);
      if (!animal) {
        return ResponseHandler.handleBadRequest("Failed to delete animal");
      }
      return ResponseHandler.handleNoContent("Animal deteted successfully")
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong deleting animal")
    }
  }


  //////////////////ANIMAL LOCATION /////////////////////////

  async addLocation(animalId: string, location: LocationDTO): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findByIdAndUpdate(animalId, {
        $push: { locations: location }
      }, { new: true });
      if (!animal) {
        return ResponseHandler.handleBadRequest("Failed to add location");
      }
      return ResponseHandler.handleCreated("Location added", animal);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to add location");
    }
  }

  async getAllLocations(animalId: string): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findById(animalId);
      if (!animal) {
        return ResponseHandler.handleBadRequest("Failed to fetch locations");
      }

      if (!animal.locations || animal.locations.length === 0) {
        return ResponseHandler.handleBadRequest("No available locations");
      }
      return ResponseHandler.handleOk("Locations fetched", animal.locations);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch locations");
    }
  }

  async getSpecificLocation(animalId: string, locationId: string): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findById(animalId);
      if (!animal) {
        return ResponseHandler.handleBadRequest("Failed to fetch locations");
      }

      const location = animal.locations.find(({ _id }) => `${_id}` === `${locationId}`);


      if (!location) {
        return ResponseHandler.handleBadRequest("Location not found");
      }

      return ResponseHandler.handleOk("Location fetched", location);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch location");
    }
  }

  async deleteLocation(animalId: string, locationId: string): Promise<ResponseDto> {
    try {
      const animal = await this.animalModel.findById(animalId);
      if (!animal) {
        return ResponseHandler.handleBadRequest("Failed to get locations");
      }

      const location = animal.locations.find(({ _id }) => `${_id}` === `${locationId}`);


      if (!location) {
        return ResponseHandler.handleNotFound("Location not found");
      }

      const locationPayload = {
        date: location.date,
        lat: location.lat,
        lng: location.lng
      }

      const updatedAnimal = await this.animalModel.findByIdAndUpdate(animalId, {
        $pull: { locations: locationPayload }
      }, { new: true });

      if (!updatedAnimal) {
        return ResponseHandler.handleBadRequest("Failed to delete location");
      }

      return ResponseHandler.handleNoContent("Location deleted");
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to delete location");
    }
  }


  ////////////////////////////////////// BREEDING //////////////////////////////////////////////

  async addBreedingInfo(id: string, breedingInfo: CreateBreedingDto): Promise<ResponseDto> {
    try {
      const animalExist = await this.animalModel.findById(id);
      if (!animalExist) {
        return ResponseHandler.handleNotFound("Animal does not exist");
      }

      if(animalExist.animalId !== breedingInfo.animalId){
        return ResponseHandler.handleBadRequest("Invalid animal ID");
      }

      const existingBreedingInfo = await this.breedingModel.findOne({
        ...breedingInfo,
        adminId: animalExist.adminId,
        animal: animalExist._id
      });

      if (existingBreedingInfo) {
        return ResponseHandler.handleBadRequest("Breeding information already exists please navigate to the breeding update")
      }

      const breedingInstance = await this.breedingModel.create({
        ...breedingInfo,
        adminId: animalExist.adminId,
        animal: animalExist._id,
        animalType: animalExist.animalType
      })

      const createdBreed = await this.breedingModel.findById(breedingInstance._id)

      if (!createdBreed) {
        return ResponseHandler.handleBadRequest("Failed to add breed")
      }

      await this.animalModel.findByIdAndUpdate(animalExist._id, {
        $push: {
          breedings: createdBreed._id
        }},
        {new: true}
      ).exec();

      return ResponseHandler.handleCreated("Breed created", createdBreed);
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to add breeding")
    }
  }

  async getAnimalBreedingInfo(Id: string): Promise<ResponseDto> {
    try {
      // check animal brreding info
      const breeding = await this.breedingModel.find({
        animal: Id
      });

      if (!breeding || breeding.length === 0) {
        return ResponseHandler.handleNotFound("Breeding information not found");
      }

      return ResponseHandler.handleOk("Breeding information fetched", breeding)
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Breeding information not found");
    }
  }

  async getAllBreedingInfo(adminId: string): Promise<ResponseDto> {
    try {
      const allBreedingInfo = await this.breedingModel.find({ adminId }).exec();
      if (!allBreedingInfo || allBreedingInfo.length === 0) {
        return ResponseHandler.handleNotFound("No breeding information found");
      }
      return ResponseHandler.handleOk("All breeding information fetched", allBreedingInfo);
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to fetch all breeding information");
    }
  }

  async updateBreedingInfo(animalId: string, breedingInfo: UpdateBreedingDto): Promise<ResponseDto> {
    try {
      const updateInfo = { ...breedingInfo };
      delete updateInfo.animalId;
      const updatedBreeding = await this.breedingModel.findByIdAndUpdate(animalId, updateInfo, { new: true }).exec();
      if (!updatedBreeding) {
        return ResponseHandler.handleNotFound("Breeding information not found");
      }
      return ResponseHandler.handleOk("Breeding information updated", updatedBreeding);
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to update breeding information");
    }
  }

  async deleteBreedingInfo(animalId: string): Promise<ResponseDto> {
    try {
      const existingBreedingInfo = await this.breedingModel.findByIdAndDelete(animalId);
      if (!existingBreedingInfo) {
        return ResponseHandler.handleNotFound("Breeding information not found");
      }
      return ResponseHandler.handleNoContent("Breeding information deleted");
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to delete breeding information");
    }
  }


  ////////////////////////////////////FEEDING////////////////////////////////////////////////////////////

  async addFeed(id: string, feedInfo: CreateFeedDto): Promise<ResponseDto> {
    try {
      
      const animalExist = await this.animalModel.findById(id);
      if (!animalExist) {
        return ResponseDto.errorResponse("Animal does not exist");
      }

      if(animalExist.animalId !== feedInfo.animalId){
        return ResponseHandler.handleBadRequest("Invalid animal ID");
      }

      // check feed is exist
      const feedExists = await this.feedingModel.findOne({
        ...feedInfo,
        adminId: animalExist.adminId,
        animal: animalExist._id
      });

      if (feedExists) {
        return ResponseHandler.handleBadRequest("Feed already exist")
      }

      const feedingInstance = await this.feedingModel.create({
        ...feedInfo,
        adminId: animalExist.adminId,
        animal: animalExist._id,
        animalType: animalExist.animalType
      })

      const createdFeed = await this.feedingModel.findById(feedingInstance._id);

      if (!createdFeed) {
        return ResponseHandler.handleBadRequest("Failed to create feed")
      }

      await this.animalModel.findByIdAndUpdate(
        animalExist._id,
        {$push: {feedings: createdFeed._id}},
        {new: true}
      ).exec();
      return ResponseHandler.handleCreated("Feed created", createdFeed);

    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to create feed")
    }
  }

  async getFeedingInfo(id: string): Promise<ResponseDto> {
    try {
      const feed = await this.feedingModel.findById(id);
      if (!feed) {
        return ResponseHandler.handleBadRequest("Failed to fetch feed")
      }

      return ResponseHandler.handleOk("Feed fetched", feed);
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to fetch feed")
    }
  }

  async getAnimalFeedingInfo(id: string): Promise<ResponseDto> {
    try {
      const feed = await this.feedingModel.find({ animal: id});
      if (!feed || feed.length === 0) {
        return ResponseHandler.handleNotFound("No feeds found")
      }
      return ResponseHandler.handleOk("Feeds fetched", feed);
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to fetch feeds")
    }
  }

  async getAllAnimalFeedingInfo(adminId: string): Promise<any> {
    try {

      const animalExists = await this.feedingModel.find({ adminId });

      if (!animalExists || animalExists.length === 0) {
        return ResponseHandler.handleNotFound("No feeding found")
      }

      return ResponseHandler.handleOk("Feeding fetched", animalExists);
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to fetch feeds")
    }
  }

  async updateFeed(id: string, updateFeedDto: UpdateFeedDto): Promise<ResponseDto> {
    try {
      const updateFeed = await this.feedingModel.findByIdAndUpdate(id, updateFeedDto, { new: true });
      if (!updateFeed) {
        return ResponseHandler.handleBadRequest("Failed to update feed")
      }
      return ResponseHandler.handleOk("Feed Updated", updateFeed);
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to update feed")
    }
  }

  async deleteFeed(id: string): Promise<ResponseDto> {
    try {
      const feed = await this.feedingModel.findByIdAndDelete(id);
      if (!feed) {
        return ResponseHandler.handleBadRequest("Feed not found");
      }
      return ResponseHandler.handleNoContent("Feed deleted successfully");
    } catch (error) {
      return ResponseHandler.handleInternalServerError("Something went wrong. Failed to delete feed");
    }
  }


  ////////////////////VACINATION/////////////////////////////////////////////////////////

  async addVaccination(id: string, createVaccinationDto: CreateVaccinationDto): Promise<ResponseDto> {
    try {
      const animalExist = await this.animalModel.findById(id)
      if (!animalExist) {
        return ResponseDto.errorResponse("Animal not found");
      }

      if(animalExist.animalId !== createVaccinationDto.animalId){
        return ResponseHandler.handleBadRequest("Invalid animal ID");
      }

      const existingVaccine = await this.vaccinationModel.findOne({
        ...createVaccinationDto,
        adminId: animalExist.adminId,
        animal: animalExist._id
      })
      if (existingVaccine) {
        return ResponseHandler.handleBadRequest("Vaccine already exist");
      }
      const vaccination = await this.vaccinationModel.create({
        ...createVaccinationDto,
        adminId: animalExist.adminId,
        animal: animalExist._id,
        animalType: animalExist.animalType
      });

      const createdVaccine = await this.vaccinationModel.findById(vaccination._id);

      if (!createdVaccine) {
        return ResponseHandler.handleBadRequest("Failed to create vaccine");
      }

      await this.animalModel.findByIdAndUpdate(
        animalExist._id,
        {$push: {vaccinations: createdVaccine._id}},
        {new: true}
      ).exec();

      return ResponseHandler.handleCreated("Vaccine created", createdVaccine);


    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to add vaccine");
    }
  }

  async getAllVaccinesInFarm(adminId: string): Promise<ResponseDto> {
    try {
      const vaccines = await this.vaccinationModel.find({ adminId }).exec();
      if (!vaccines || vaccines.length === 0) {
        return ResponseHandler.handleNotFound("No available vaccine");
      }
      return ResponseHandler.handleOk("Vaccines fetched", vaccines);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch vaccines");
    }
  }

  async getAllVaccinesPerAnimal(id: string): Promise<ResponseDto> {
    try {
      const vaccines = await this.vaccinationModel.find({ animal: id});
      if (!vaccines || vaccines.length === 0) {
        return ResponseHandler.handleNotFound("No available vaccine");
      }
      return ResponseHandler.handleOk("Vaccines fetched", vaccines);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch vaccines");
    }
  }

  async getSpecificVaccine(Id: string): Promise<ResponseDto> {
    try {
      const vaccine = await this.vaccinationModel.findById(Id);
      if (!vaccine) {
        return ResponseHandler.handleBadRequest("Failed to fetch vaccine");
      }
      return ResponseHandler.handleOk("Vaccine fetched", vaccine);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch vaccine");
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
        return ResponseHandler.handleBadRequest("Failed to update vaccine");
      }
      return ResponseHandler.handleOk("Vaccine updated", updatedVaccine);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to update vaccine");
    }
  }

  async deleteVaccine(Id: string): Promise<ResponseDto> {
    try {
      const deletedVaccine = await this.vaccinationModel.findByIdAndDelete(Id);
      if (!deletedVaccine) {
        return ResponseHandler.handleBadRequest("Failed to delete vaccine");
      }
      return ResponseHandler.handleNoContent("Vaccine deleted");
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to delete vaccine");
    }
  }

  ///////////////////////PRODUCTION///////////////////////////////////////

  async addProduction(id: string, createProductionDto: CreateProductionDto): Promise<ResponseDto> {
    try {
      const animalExist = await this.animalModel.findById(id)
      if (!animalExist) {
        return ResponseDto.errorResponse("Animal not found");
      }

      if(animalExist.animalId !== createProductionDto.animalId){
        return ResponseHandler.handleBadRequest("Invalid animal ID");
      }

      const existingProduction = await this.productionModel.findOne({
        ...createProductionDto,
        adminId: animalExist.adminId,
        animal: animalExist._id,
        meatProduction: { $exists: true },
        milkProduction: { $exists: true },
        woolFurProduction: { $exists: true },
        salesRecords: { $exists: true, $ne: [] }
      })
      if (existingProduction) {
        return ResponseHandler.handleBadRequest("Production already exist");
      }


      const productionInstance = await this.productionModel.create({
        ...createProductionDto,
        adminId: animalExist.adminId,
        animal: animalExist._id,
        animalType: animalExist.animalType
      });

      const createdProduction = await this.productionModel.findById(productionInstance._id)

      if (!createdProduction) {
        return ResponseHandler.handleBadRequest("Failed to add animal production");
      }

      await this.animalModel.findByIdAndUpdate(
        animalExist._id,
        {$push: {productions: createdProduction._id}},
        {new: true}
      ).exec();

      return ResponseHandler.handleCreated("Production added", createdProduction);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to add animal production");
    }
  }

  async getAllProductionsInFarm(adminId: string): Promise<ResponseDto> {
    try {
      const productions = await this.productionModel.find({ adminId });

      if (!productions || productions.length === 0) {
        return ResponseHandler.handleNotFound("No available productions");
      }
      return ResponseHandler.handleOk("Productions fetched", productions);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch productions");
    }
  }

  async getAllProductionsPerAnimal(id: string): Promise<ResponseDto> {
    try {
      const productions = await this.productionModel.find({ animal: id});

      if (!productions || productions.length === 0) {
        return ResponseHandler.handleNotFound("No available productions");
      }
      return ResponseHandler.handleOk("Productions fetched", productions);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch productions");
    }
  }

  async getSpecificProduction(Id: string): Promise<ResponseDto> {
    try {
      const production = await this.productionModel.findById(Id);
      if (!production) {
        return ResponseHandler.handleBadRequest("Failed to fetch production");
      }
      return ResponseHandler.handleOk("Production fetched", production);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch production");
    }
  }

  async updateProduction(Id: string, updateProductionDto: UpdateProductionDto): Promise<ResponseDto> {
    try {
      const updatedProduction = await this.productionModel.findByIdAndUpdate(Id, updateProductionDto,
        { new: true });


      if (!updatedProduction) {
        return ResponseHandler.handleBadRequest("Failed to update production");
      }
      return ResponseHandler.handleOk("Production updated", updatedProduction);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to update production");
    }
  }

  async deleteProduction(Id: string): Promise<ResponseDto> {
    try {
      const deletedProduction = await this.productionModel.findByIdAndDelete(Id);
      if (!deletedProduction) {
        return ResponseHandler.handleBadRequest("Failed to delete production");
      }
      return ResponseHandler.handleNoContent("Production deleted");
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to delete production");
    }
  }


  //////////////////////////////ANIMAL REQUEST //////////////////////////////////////

  async addAnimalRequest(adminId: string, createAnimalRequestDto: CreateAnimalRequestDto): Promise<ResponseDto> {
    try {
      const existingRequest = await this.animalRequestModel.findOne({
        ...createAnimalRequestDto
      })

      if (existingRequest) {
        return ResponseHandler.handleBadRequest("Request already exist");
      }

      const animalRequestInstance = await this.animalRequestModel.create({
        ...createAnimalRequestDto,
        adminId
      });

      const createdRequest = await this.animalRequestModel.findById(animalRequestInstance._id)

      if (!createdRequest) {
        return ResponseHandler.handleBadRequest("Failed to add animal request");
      }

      return ResponseHandler.handleCreated("Request added", createdRequest);


    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to add animal request");
    }
  }

  async getAllAnimalRequests(adminId: string): Promise<ResponseDto> {
    try {
      const requests = await this.animalRequestModel.find({ adminId });

      if (!requests || requests.length === 0) {
        return ResponseHandler.handleNotFound("No available requests");
      }
      return ResponseHandler.handleOk("Requests fetched", requests);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch requests");
    }
  }

  async rejectAnimalRequest(id: string): Promise<ResponseDto> {
    try {
      const request = await this.animalRequestModel.findByIdAndUpdate(id, { $set: { status: 'rejected' } }, { new: true });
      if (!request) {
        return ResponseHandler.handleBadRequest("Failed to reject request");
      }
      return ResponseHandler.handleOk("Request rejected", request);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to reject request");
    }
  }

  async approveAnimalRequest(id: string): Promise<ResponseDto> {
    try {
      const request = await this.animalRequestModel.findByIdAndUpdate(id, { $set: { status: 'approved' } }, { new: true });
      if (!request) {
        return ResponseHandler.handleBadRequest("Failed to approve request");
      }
      return ResponseHandler.handleOk("Request approved", request);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to approve request");
    }
  }

  async getRejectedAnimalRequest(adminId: string): Promise<ResponseDto> {
    try {
      const request = await this.animalRequestModel.find({ adminId, status: 'rejected' });
      if (!request || request.length === 0) {
        return ResponseHandler.handleNotFound("No available requests");
      }
      return ResponseHandler.handleOk("Request fetched", request);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch request");
    }
  }

  async getApprovedAnimalRequest(adminId: string): Promise<ResponseDto> {
    try {
      const request = await this.animalRequestModel.find({ adminId, status: 'approved' });
      if (!request || request.length === 0) {
        return ResponseHandler.handleNotFound("No available request");
      }
      return ResponseHandler.handleOk("Request fetched", request);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch request");
    }
  }

  async getPendingAnimalRequest(adminId: string): Promise<ResponseDto> {
    try {

      const request = await this.animalRequestModel.find({ adminId, status: "pending" });
      if (!request || request.length === 0) {
        return ResponseHandler.handleNotFound("No available request");
      }
      return ResponseHandler.handleOk("Request fetched", request);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch request");
    }
  }

  async getSpecificAnimalRequest(Id: string): Promise<ResponseDto> {
    try {
      const request = await this.animalRequestModel.findById(Id);
      if (!request) {
        return ResponseHandler.handleBadRequest("Failed to fetch request");
      }
      return ResponseHandler.handleOk("Request fetched", request);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to fetch request");
    }
  }

  async addApprovedAnimalToFarmAnimals(id: string): Promise<ResponseDto> {
    try {
      const approvedAnimal = await this.animalRequestModel.findOne({
        _id: id,
        status: 'approved'
      });
      if (!approvedAnimal) {
        return ResponseHandler.handleBadRequest("Failed to fetch request");
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
        return ResponseHandler.handleBadRequest("Failed to add animal to farm animals");
      }
      return ResponseHandler.handleOk("Animal added to farm animals", createdAnimal);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to add animal to farm animals");
    }
  }

  async updateAnimalRequest(Id: string, updateAnimalRequestDto: UpdateAnimalRequestDto): Promise<ResponseDto> {
    try {
      const updatedRequest = await this.animalRequestModel.findByIdAndUpdate(Id, updateAnimalRequestDto,
        { new: true });

      if (!updatedRequest) {
        return ResponseHandler.handleBadRequest("Failed to update request");
      }
      return ResponseHandler.handleOk("Request updated", updatedRequest);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to update request");
    }
  }

  async deleteAnimalRequest(Id: string): Promise<ResponseDto> {
    try {
      const deletedRequest = await this.animalRequestModel.findByIdAndDelete(Id);
      if (!deletedRequest) {
        return ResponseHandler.handleBadRequest("Failed to delete request");
      }
      return ResponseHandler.handleNoContent("Request deleted");
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, failed to delete request");
    }
  }




}
