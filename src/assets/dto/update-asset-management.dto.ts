import { PartialType } from "@nestjs/swagger";
import { CreateAssetDTO } from "./asset-management.dto";

export class UpdateAssetDto extends PartialType(CreateAssetDTO) {}