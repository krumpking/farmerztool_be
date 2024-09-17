import { PartialType } from "@nestjs/swagger";
import { CreateFinancialDto } from "./financial.dto";

export class UpdateFinancialDto extends PartialType(CreateFinancialDto){}