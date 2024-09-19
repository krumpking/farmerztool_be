
import { PartialType } from "@nestjs/swagger";
import { CreateBreedingDto } from "./breeding.dto";

export class UpdateBreedingDto extends PartialType(CreateBreedingDto) {}