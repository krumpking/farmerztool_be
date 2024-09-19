import { PartialType } from "@nestjs/swagger";
import { CreateFertiliserPesticideDTO } from "./create-fert-pest.dto";

export class UpdateFertiliserPesticideDTO extends PartialType(CreateFertiliserPesticideDTO) {}