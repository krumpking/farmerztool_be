import { PartialType } from "@nestjs/swagger";
import { CreateInspectionDTO } from "./asset-inspection.dto";

export class UpdateAssetInpsectionDto extends PartialType(CreateInspectionDTO) { }