import { PartialType } from "@nestjs/mapped-types";
import { CreateFeedDto } from "./feed.dto";

export class UpdateFeedDto extends PartialType(CreateFeedDto){};