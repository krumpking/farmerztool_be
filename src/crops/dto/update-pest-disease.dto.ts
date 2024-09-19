
import { PartialType } from "@nestjs/swagger";
import { CreatePestDiseaseIssueDto } from "./pest-disease.dto";

export class UpdatePestDiseaseIssueDto extends PartialType(CreatePestDiseaseIssueDto)  { }