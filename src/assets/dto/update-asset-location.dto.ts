import { PartialType } from "@nestjs/swagger";
import { CreateAssetLocationDto } from "./asset-location.dto";

export class UpdateAssetLocationDto extends PartialType(CreateAssetLocationDto) {}