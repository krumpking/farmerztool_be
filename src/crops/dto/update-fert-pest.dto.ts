import { PartialType } from "@nestjs/mapped-types";
import { CreateFertiliserPesticideDTO } from "./create-fert-pest.dto";

export class UpdateFertiliserPesticideDTO extends PartialType(CreateFertiliserPesticideDTO) {}