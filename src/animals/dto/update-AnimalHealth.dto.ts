import { PartialType } from "@nestjs/swagger";
import { CreateAnimalHealthDto } from "./animalHealthRecords.dto";

export class UpdateAnimalHealthDto extends PartialType(CreateAnimalHealthDto) { }