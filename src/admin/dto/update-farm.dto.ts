
import { PartialType } from "@nestjs/swagger";
import { CreateFarmDto } from "./create-admin.dto"

export class UpdateFarmDto extends PartialType(CreateFarmDto) {}