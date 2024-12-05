import { PartialType } from "@nestjs/swagger";
import { AnimalGrowthDTO } from "./animalGrowth.dto";

export class UpdateAnimalGrowthDto extends PartialType(AnimalGrowthDTO) { }