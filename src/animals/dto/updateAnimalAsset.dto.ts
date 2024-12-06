import { PartialType } from "@nestjs/swagger";
import { CreateAnimalAssetDto } from "./animalAsset.dto";

export class UpdateAnimalAssetDTO extends PartialType(CreateAnimalAssetDto) { }