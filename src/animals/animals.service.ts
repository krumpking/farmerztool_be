import { Inject, Injectable } from '@nestjs/common';
import {
  ANIMAL_MODEL,
  BREEDING_MODEL,
  FEED_MODEL,
} from './constants/animal.constants';
import { Model } from 'mongoose';

import { CreateAnimalDto } from './dto/create-animal.dto';
import { Animal } from './interfaces/animal.interface';
import { BreedingInfo } from './interfaces/breeding.info.inferface';
import { CreateBreedingDto } from './dto/breeding.dto';
import { CreateFeedDto } from './dto/feed.dto';
import { Feed } from './interfaces/feed.interface';
import { Vaccination } from './interfaces/vaccination.interface';

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
  ) {}

  async addAnimal(createAnimalDto: CreateAnimalDto): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const animalExists = await this.animalModel.find({
        animalId: createAnimalDto.animalId,
      });

      // If email exists, return email already exists message and success false, else create user
      if (animalExists.length > 0) {
        // if farm exists upadate the farm
        return this.animalModel.findOneAndUpdate(
          { adminId: createAnimalDto.adminId },
          createAnimalDto,
          { new: true },
        );
      }
      const createdAnimal = new this.animalModel(createAnimalDto);

      var newAnimal = await createdAnimal.save();
      return newAnimal;
    } catch (error) {
      return null;
    }
  }

  async getAnimal(animalId: String): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const animalExists = await this.animalModel.find({
        animalId: animalId,
      });

      return animalExists;
    } catch (error) {
      return null;
    }
  }

  async getAllMyAnimals(adminId: String): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const animalExists = await this.animalModel.find({
        adminId: adminId,
      });

      return animalExists;
    } catch (error) {
      return null;
    }
  }

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

      var newBreedingInfo = await addedBreedingInfo.save();
      return newBreedingInfo;
    } catch (error) {
      return null;
    }
  }

  async getAnimalBreedingInfo(animalId: String): Promise<any> {
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

  async getAllBreedingInfo(adminId: String): Promise<any> {
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

      var newBreedingInfo = await feed.save();
      return newBreedingInfo;
    } catch (error) {
      return null;
    }
  }

  async getAnimalFeedingInfo(animalId: String): Promise<any> {
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
}
