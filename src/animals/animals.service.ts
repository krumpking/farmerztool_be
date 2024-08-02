import { Inject, Injectable } from '@nestjs/common';
import { ANIMAL_MODEL } from './constants/animal.constants';
import { Model } from 'mongoose';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @Inject(ANIMAL_MODEL)
    private animalModel: Model<Animal>,
  ) {}

  async addAnimal(createAnimalDto: CreateAnimalDto): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const animalExists = await this.animalModel.find({
        animalId: createAnimalDto.animalId,
      });

      // If email exists, return email already exists message and success false, else create user
      if (animalExists.length > 0) {
        return null;
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
}
