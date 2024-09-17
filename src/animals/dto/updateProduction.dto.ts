
import { PartialType } from "@nestjs/swagger";
import { CreateProductionDto } from "./production.dto";

export class UpdateProductionDto extends PartialType(CreateProductionDto) {};