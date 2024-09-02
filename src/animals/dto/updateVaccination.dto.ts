import { PartialType } from "@nestjs/mapped-types";
import { CreateVaccinationDto } from "./vaccination.dto";

export class UpdateVaccinationDto extends PartialType(CreateVaccinationDto) {};