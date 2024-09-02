import { PartialType } from "@nestjs/mapped-types";
import { CreateBreedingDto } from "./breeding.dto";

export class UpdateBreedingDto extends PartialType(CreateBreedingDto) {}