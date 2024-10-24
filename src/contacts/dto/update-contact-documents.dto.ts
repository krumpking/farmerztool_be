import { PartialType } from "@nestjs/swagger";
import { CreateContactDocumentDto } from "./create-contact-document.dto";

export class UpdateContactDocumentDto extends PartialType(CreateContactDocumentDto) {}