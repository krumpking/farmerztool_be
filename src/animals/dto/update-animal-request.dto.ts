import { PartialType } from "@nestjs/swagger";
import { CreateAnimalRequestDto } from "./animalByEmployeeRequest.dto";

export class UpdateAnimalRequestDto extends PartialType(CreateAnimalRequestDto) {}