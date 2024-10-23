import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';


enum SourceOfDocument {
    IN_HOUSE = 'in-house',
    CLIENT = 'client',
  }

export class CreateContactDocumentDto {

  @ApiProperty({
    description: 'The name of the contact associated with the document',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @ApiProperty({
    description: 'The type of document eg: Invoice',
    example: 'invoice',
  })
 @IsString()
  documentType: string;

  @ApiProperty({
    description: 'The title of the document',
    example: 'Invoice for January 2023',
  })
  @IsString()
  @IsNotEmpty()
  documentTitle: string;

  @ApiProperty({
    description: 'The details of the document',
    example: 'This is a sample invoice',
  })
  @IsString()
  @IsNotEmpty()
  documentDetails: string;

  @ApiProperty({
    description: 'The source of the document. NB: Enum taking [in-house, client]',
    example: 'in-house',
    enum: ['in-house', 'client'],
  })
  @IsEnum(SourceOfDocument)
  @IsNotEmpty()
  sourceOfDocument: SourceOfDocument;
}


