import { PartialType } from "@nestjs/swagger";
import { CropActivityDto } from "./activity.dto";

export class UpdateActivityDto extends PartialType(CropActivityDto) {}