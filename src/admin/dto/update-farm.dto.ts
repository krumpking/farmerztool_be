import { PartialType } from "@nestjs/mapped-types"
import { CreateFarmDto } from "./create-admin.dto"

export class UpdateFarmDto extends PartialType(CreateFarmDto) {}