import { PartialType } from "@nestjs/mapped-types";
import { CreateProductionDto } from "./production.dto";

export class UpdateProductionDto extends PartialType(CreateProductionDto) {};