import { PartialType } from "@nestjs/swagger";
import { CreateAssetFinancialDTO } from "./asset-financial.dto";

export class UpdateAssetFinancial extends PartialType(CreateAssetFinancialDTO) {}