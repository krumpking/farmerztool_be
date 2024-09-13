import { PartialType } from "@nestjs/mapped-types";
import { CropActivityDto } from "./activity.dto";

export class UpdateActivityDto extends PartialType(CropActivityDto) {}