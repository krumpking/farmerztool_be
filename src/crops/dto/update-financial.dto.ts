import { PartialType } from "@nestjs/mapped-types";
import { CreateFinancialDto } from "./financial.dto";

export class UpdateFinancialDto extends PartialType(CreateFinancialDto){}