import { PartialType } from "@nestjs/swagger";
import { CreateContactActivityDTO } from "./create-contact-activities.dto";

export class UpdateContactActivityDto extends PartialType(CreateContactActivityDTO) {}