
import { PartialType } from "@nestjs/swagger";
import { CreateFeedDto } from "./feed.dto";

export class UpdateFeedDto extends PartialType(CreateFeedDto){};