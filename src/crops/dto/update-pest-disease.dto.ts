import { PartialType } from "@nestjs/mapped-types";
import { CreatePestDiseaseIssueDto } from "./pest-disease.dto";

export class UpdatePestDiseaseIssueDto extends PartialType(CreatePestDiseaseIssueDto)  { }