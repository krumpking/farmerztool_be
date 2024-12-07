import { PartialType } from "@nestjs/swagger";
import { AnimalOwnershipDTO } from "./animalOwnership.dto";

export class UpdateAnimalOwnershipDTO extends PartialType(AnimalOwnershipDTO) { }