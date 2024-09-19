
import { PartialType } from "@nestjs/swagger";
import { CreateVaccinationDto } from "./vaccination.dto";

export class UpdateVaccinationDto extends PartialType(CreateVaccinationDto) {};