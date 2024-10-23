import { PartialType } from "@nestjs/swagger";
import { CreateFinancialActivityDto } from "./create-contact-finances.dto";

export class UpdateFinancialActivityDto extends PartialType(CreateFinancialActivityDto){}